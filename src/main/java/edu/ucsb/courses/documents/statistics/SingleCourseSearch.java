package edu.ucsb.courses.documents.statistics;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.commons.lang3.builder.EqualsBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SingleCourseSearch {

    private static Logger logger = LoggerFactory.getLogger(QuarterDept.class);

    private int professorCount;
    private String professor;

    public SingleCourseSearch() {
    }

    public SingleCourseSearch(int professorCount,String professor) {
        this.professorCount = 5000;
        this.professor = "Testing";
    }

    public String getProfessor() {
        return this.professor;
    }

    public void setProfessor(String professor) {
        this.professor = professor;
    }


    public int getProfessorCount() {
        return this.professorCount;
    }

    public void setProfessorCount(int professorCount) {
        this.professorCount = professorCount;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof SingleCourseSearch)) {
            return false;
        }
        
        SingleCourseSearch oc = (SingleCourseSearch) o;

        EqualsBuilder builder = new EqualsBuilder();
        builder.append(professor, oc.getProfessor()).append(professorCount, oc.getProfessorCount());
        return builder.build();
    }

    @Override
    public int hashCode() {
        return Objects.hash(professor, professorCount);
    }


    @Override
    public String toString() {
        return "{" +
            "professor='" + professor + "'" +
            ", professorCount='" + professorCount + "'" +
            "}";
    }
    
    public static List<SingleCourseSearch> listFromJSON(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            List<SingleCourseSearch> lqd = objectMapper.readValue(json, new TypeReference<List<SingleCourseSearch>>(){});
            return lqd;
        } catch (JsonProcessingException jpe) {
            logger.error("JsonProcessingException:" + jpe);
            return null;
        }
        
    }

}