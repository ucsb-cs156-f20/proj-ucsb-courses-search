package edu.ucsb.courses.controllers;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.unwind;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.limit;

import java.lang.String;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.aggregation.UnwindOperation;

import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.aggregation.LimitOperation;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import edu.ucsb.courses.documents.statistics.FullCourse;
import edu.ucsb.courses.documents.statistics.FullSummary;
import edu.ucsb.courses.documents.statistics.DivisionOccupancy;

import edu.ucsb.courses.documents.Course;
import edu.ucsb.courses.documents.CoursePage;

import edu.ucsb.courses.documents.statistics.QuarterDept;
import edu.ucsb.courses.repositories.ArchivedCourseRepository;

import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Sorts;


import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.aggregation.UnwindOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import edu.ucsb.courses.documents.statistics.AvgClassSize;

@RestController
@RequestMapping("/api/public/statistics")
public class StatisticsController {
    private final Logger logger = LoggerFactory.getLogger(StatisticsController.class);
    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private ArchivedCourseRepository courseRepository;

    @GetMapping(value = "/courseCount", produces = "application/json")
    public ResponseEntity<String> courseCount()
        throws JsonProcessingException, Exception {

        SortOperation sortByQuarterAndDeptCode = sort(Sort.by(Direction.DESC, "quarter")).and(Sort.by(Direction.ASC, "deptCode"));

        GroupOperation groupByQuarterAndDeptCode = group("quarter","deptCode").count().as("courseCount");

        Aggregation aggregation = newAggregation(groupByQuarterAndDeptCode, sortByQuarterAndDeptCode);

        AggregationResults<QuarterDept> result =
            mongoTemplate.aggregate(aggregation, "courses", QuarterDept.class);

        List<QuarterDept> qds = result.getMappedResults();

        logger.info("qds={}",qds);
        String body = mapper.writeValueAsString(qds);
        return ResponseEntity.ok().body(body);

    }

    @GetMapping(value = "/courseOccupancyByDivision", produces = "application/json")
    public ResponseEntity<String> courseOccupancyByDivision(
        @RequestParam(required=true) String startQuarter,
        @RequestParam(required=true) String endQuarter,
        @RequestParam(required=true) String department,
        @RequestParam(required=true) String level)
        throws JsonProcessingException {
            MatchOperation matchOperation = match(Criteria.where("quarter").gte(startQuarter).lte(endQuarter)
                .and("deptCode").is(department).and("instructionType").is("LEC").and("objLevelCode").is(level));
            UnwindOperation unwindOperation = unwind("$classSections", "index", false);
            MatchOperation sectionOrLect = null;

            if(level.equals("U")) {
                sectionOrLect = match(Criteria.where("index").ne(0).and("classSections.enrolledTotal").ne(null));
            }else {
                sectionOrLect = match(Criteria.where("index").ne(-1).and("classSections.enrolledTotal").ne(null));
            }

            GroupOperation groupOperation = group("_id", "$quarter", "title", "courseId").sum("$classSections.enrolledTotal").as("enrolled").sum("$classSections.maxEnroll").as("maxEnrolled");
            ProjectionOperation project = project("_id","quarter", "title", "courseId", "enrolled", "maxEnrolled");
            SortOperation sort = sort(Sort.by(Direction.ASC, "_id"));
            SortOperation quarterSort = sort(Sort.by(Direction.ASC, "quarter"));

            Aggregation aggregation = newAggregation(matchOperation, unwindOperation, sectionOrLect, groupOperation, project, sort, quarterSort);

            AggregationResults<DivisionOccupancy> result = mongoTemplate.aggregate(aggregation, "courses",
                DivisionOccupancy.class);
            List<DivisionOccupancy> divOc = result.getMappedResults();

            logger.info("divOc={}", divOc);
            String body = mapper.writeValueAsString(divOc);

            return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/fullCoursesByDept", produces = "application/json")
    public ResponseEntity<String> numFullCoursesByDept(@RequestParam(required = true) String startQuarter, @RequestParam(required = true) String endQuarter, @RequestParam(required = true) String department)
            throws JsonProcessingException {

        String body = mapper.writeValueAsString(courseRepository.findFullCoursesByQuarterIntervalAndDepartment(startQuarter, endQuarter, department));

        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/classSize", produces = "application/json")
    public ResponseEntity<String> classSize(@RequestParam(required = true) String startQuarter, @RequestParam(required = true) String endQuarter)
            throws JsonProcessingException {
        MatchOperation matchOperation = match(Criteria.where("quarter").gte(startQuarter).lte(endQuarter));

        UnwindOperation unwindOperation = unwind("$classSections", "index", false);

        MatchOperation onlyLectures = match(Criteria.where("index").is(0));

        MatchOperation onlyValidLecs = match(Criteria.where("classSections.enrolledTotal").ne(null).and("classSections.maxEnroll").ne(0));

        GroupOperation groupOperation = group("$deptCode").avg("$classSections.maxEnroll").as("avgClassSize");

        SortOperation numberSort = sort(Sort.by(Direction.ASC, "avgClassSize"));


        Aggregation aggregation = newAggregation(matchOperation, unwindOperation, onlyLectures, onlyValidLecs, groupOperation,numberSort);

        AggregationResults<AvgClassSize> result = mongoTemplate.aggregate(aggregation, "courses",
                AvgClassSize.class);
        List<AvgClassSize> qo = result.getMappedResults();

        String body = mapper.writeValueAsString(qo);

        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/courseOccupancy", produces = "application/json")
    public ResponseEntity<String> courseOccupancy(@RequestParam(required = true) String startQuarter, @RequestParam(required = true) String endQuarter, @RequestParam(required = true) String department)
            throws JsonProcessingException {

        String body = mapper.writeValueAsString(courseRepository.findOccupancyByQuarterIntervalAndDepartment(startQuarter, endQuarter, department));

        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/fullDeptSummary", produces = "application/json")
    public ResponseEntity<String> fullDeptSummary(@RequestParam(required = true) String startQuarter)
            throws JsonProcessingException {
        MatchOperation matchOperation = match(Criteria.where("quarter").is(startQuarter));

        UnwindOperation unwindOperation = unwind("$classSections", "index", false);

        MatchOperation onlyLectures = match(Criteria.where("index").is(0));

        MatchOperation onlyValidLecs = match(Criteria.where("classSections.enrolledTotal").ne(null).and("classSections.maxEnroll").ne(0));

        GroupOperation groupOperation1 = group("$deptCode").count().as("numCourses");

        SortOperation deptSort = sort(Sort.by(Direction.ASC, "_id"));

        Aggregation aggregation = newAggregation(matchOperation, unwindOperation, onlyLectures, onlyValidLecs, groupOperation, deptSort);

        AggregationResults<FullSummary> result = mongoTemplate.aggregate(aggregation, "courses",
                FullSummary.class);
        List<FullSummary> qo = result.getMappedResults();

        String body = mapper.writeValueAsString(qo);

        return ResponseEntity.ok().body(body);
    }


}
