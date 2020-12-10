package edu.ucsb.courses.controllers;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;

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
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.courses.documents.statistics.QuarterDept;

@RestController
@RequestMapping("/api/public/statistics")
public class StatisticsController {
    private final Logger logger = LoggerFactory.getLogger(StatisticsController.class);
    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private MongoTemplate mongoTemplate;
    
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

    @GetMapping(value = "/fullCoursesByDept", produces = "application/json")
    public ResponseEntity<String> numFullCoursesByDept(
        @RequestParam String startQuarter,
        @RequestParam String endQuarter,
        @RequestParam String department)
        throws JsonProcessingException, Exception {

            // Real aggregation needs to go here

            // Right now I am returning what the user searched for
            // to show the frontend/backend connection is working
            String body = "{\"startQuarter\": \"" + startQuarter + "\"," + "\"endQuarter\": \"" + endQuarter + "\"," + "\"department\": \"" + department + "\"}";

            return ResponseEntity.ok().body(body);
    }
}
