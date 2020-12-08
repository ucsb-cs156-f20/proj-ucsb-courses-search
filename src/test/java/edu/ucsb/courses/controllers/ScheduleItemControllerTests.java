package edu.ucsb.courses.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import edu.ucsb.courses.config.SecurityConfig;
import edu.ucsb.courses.entities.Schedule;
import edu.ucsb.courses.entities.ScheduleItem;
import edu.ucsb.courses.repositories.ScheduleItemRepository;
import edu.ucsb.courses.repositories.ScheduleRepository;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpHeaders;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;


// @Import(SecurityConfig.class) applies the security rules 
// so that /api/public/** endpoints don't require authentication.
// Otherwise you may get authorization errors when running the test

@WebMvcTest(value = ScheduleItemController.class)
@WithMockUser
//@Import(SecurityConfig.class)
public class ScheduleItemControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ScheduleItemRepository scheduleItemRepository;

    private String userToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void test_getScheduleItemSuccess() throws Exception {

        String expectedResult = "{id=1 courseId='CS 156', enrollCode='Adv App Programming', scheduleId='1}";
        String urlTemplate = "/api/public/getScheduleItemById?id=%s";
        String url = String.format(urlTemplate, "1");

        DecodedJWT jwt = JWT.decode(userToken.substring(7));

        ScheduleItem scheduleItem = new ScheduleItem(1L,"CS 156", "Adv App Programming", jwt.getSubject(), 1L);

        Optional<ScheduleItem> opt = Optional.of(scheduleItem);

        when(scheduleItemRepository.findById(any(Long.class)))
                .thenReturn(opt);

        MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isOk())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();
        ScheduleItem returnVal = objectMapper.readValue(responseString,ScheduleItem.class);

        assertEquals(scheduleItem, returnVal);
    }


    @Test
    public void test_getScheduleFailureNoScheduleItem() throws Exception {
        String expectedResult = "";
        String urlTemplate = "/api/public/getScheduleItemById?id=%s";
        String url = String.format(urlTemplate, "1");

        //Schedule schedule = new Schedule(1L,"CS 156", "Adv App Programming", "Fall 2020", "s");

        Optional<ScheduleItem> opt = Optional.empty();

        when(scheduleItemRepository.findById(any(Long.class)))
                .thenReturn(opt);

        MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isBadRequest())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }

    @Test
    public void test_getScheduleFailureNoAuth() throws Exception {
        String expectedResult = "";
        String urlTemplate = "/api/public/getScheduleItemById?id=%s";
        String url = String.format(urlTemplate, "1");

        //DecodedJWT jwt = JWT.decode(userToken.substring(7));

        ScheduleItem scheduleItem = new ScheduleItem(1L,"CS 156", "Adv App Programming", "", 1L);

        Optional<ScheduleItem> opt = Optional.of(scheduleItem);

        when(scheduleItemRepository.findById(any(Long.class)))
                .thenReturn(opt);

        MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isBadRequest())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }

    @Test
    public void test_addScheduleItemSuccess() throws Exception {
        String expectedResult = "{id=1 courseId='CS 156', enrollCode='Adv App Programming', scheduleId='1}";
        String urlTemplate = "/api/public/addScheduleItem?scheduleId=%s&enrollCode=%s&courseId=%s";
        String url = String.format(urlTemplate, "1", "Adv App Programming", "CS 156");

        DecodedJWT jwt = JWT.decode(userToken.substring(7));

        ScheduleItem schedule = new ScheduleItem(1L,"CS 156", "Adv App Programming", jwt.getSubject(), 1L);

        when(scheduleItemRepository.save(any(ScheduleItem.class)))
                .thenReturn(schedule);

        MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION, userToken)).andExpect(status().isOk())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();
        ScheduleItem returnVal = objectMapper.readValue(responseString, ScheduleItem.class);

        assertEquals(returnVal, schedule);
    }

    @Test
    public void test_deleteScheduleItemSuccess() throws Exception {
        String expectedResult = "";
        String urlTemplate = "/api/public/removeScheduleItem?id=%s";
        String url = String.format(urlTemplate, "1");

        DecodedJWT jwt = JWT.decode(userToken.substring(7));
        ScheduleItem scheduleItem = new ScheduleItem(1L,"CS 156", "Adv App Programming", jwt.getSubject(), 1L);
        Optional<ScheduleItem> opt = Optional.of(scheduleItem);

        when(scheduleItemRepository.findById(any(Long.class)))
                .thenReturn(opt);

        MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isOk())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }

    @Test
    public void test_getScheduleItemsByScheduleIdSuccess() throws Exception {
        String expectedResult = "1,2";
        String urlTemplate = "/api/public/getScheduleItemsByScheduleId?scheduleId=%s";
        String url = String.format(urlTemplate, "1");

        DecodedJWT jwt = JWT.decode(userToken.substring(7));

        ScheduleItem s1 = new ScheduleItem(1L,"CS 156", "Adv App Programming", jwt.getSubject(), 1L);
        ScheduleItem s2 = new ScheduleItem(2L,"CS 156", "Adv App Programming", jwt.getSubject(),1L);
        List<ScheduleItem> scheduleItem = new ArrayList<ScheduleItem>();
        scheduleItem.add(s1);
        scheduleItem.add(s2);

        when(scheduleItemRepository.findByScheduleId(any(Long.class)))
                .thenReturn(scheduleItem);

        MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isOk())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();
        String[] returnVal = responseString.split("!");
        ScheduleItem r1 = objectMapper.readValue(returnVal[0],ScheduleItem.class);
        ScheduleItem r2 = objectMapper.readValue(returnVal[1],ScheduleItem.class);

        assertEquals(s1, r1);
        assertEquals(s2,r2);
    }

    @Test
    public void test_getScheduleItemsByScheduleIdSuccessNoItems() throws Exception {
        String expectedResult = "";
        String urlTemplate = "/api/public/getScheduleItemsByScheduleId?scheduleId=%s";
        String url = String.format(urlTemplate, "1");
        DecodedJWT jwt = JWT.decode(userToken.substring(7));

        ScheduleItem s1 = new ScheduleItem(1L,"CS 156", "Adv App Programming", jwt.getSubject(), 1L);
        ScheduleItem s2 = new ScheduleItem(2L,"CS 156", "Adv App Programming", jwt.getSubject(),1L);
        List<ScheduleItem> scheduleItem = new ArrayList<ScheduleItem>();

        when(scheduleItemRepository.findByScheduleId(any(Long.class)))
                .thenReturn(scheduleItem);

        MvcResult response = mockMvc.perform(get(url).contentType("application/json").header(HttpHeaders.AUTHORIZATION, userToken)).andExpect(status().isNoContent())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }

    @Test
    public void test_deleteScheduleItemByScheduleIdSuccess() throws Exception {
        String expectedResult = "";
        String urlTemplate = "/api/public/removeScheduleItemsByScheduleId?scheduleId=%s";
        String url = String.format(urlTemplate, "1");

        DecodedJWT jwt = JWT.decode(userToken.substring(7));

        ScheduleItem s1 = new ScheduleItem(1L,"CS 156", "Adv App Programming", jwt.getSubject(), 1L);
        ScheduleItem s2 = new ScheduleItem(2L,"CS 156", "Adv App Programming", jwt.getSubject(),1L);
        List<ScheduleItem> scheduleItem = new ArrayList<ScheduleItem>();
        scheduleItem.add(s1);
        scheduleItem.add(s2);

        when(scheduleItemRepository.findByScheduleId(any(Long.class)))
                .thenReturn(scheduleItem);



        MvcResult response = mockMvc.perform(delete(url).with(csrf()).contentType("application/json").header(HttpHeaders.AUTHORIZATION,userToken)).andExpect(status().isOk())
                .andReturn();

        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedResult, responseString);
    }
}
