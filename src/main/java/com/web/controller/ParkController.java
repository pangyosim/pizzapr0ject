package com.web.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.web.repo.ParkingEntity;
import com.web.service.ParkService;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;


@Controller
@PropertySource("classpath:application.properties")
public class ParkController {

    @Value("${openapi.parking.servicekey}")
    private String servickey;
    @Autowired
    private ParkService ps;

    @GetMapping("/transpark")
    public void parking() {

        try {
            URL url = new URL("http://openapi.seoul.go.kr:8088/" + servickey + "/json/GetParkInfo/1/1000");
            BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
            StringBuilder resultBuilder = new StringBuilder();
            String line;
            while ((line = bf.readLine()) != null) {
                resultBuilder.append(line);
            }
            String result = resultBuilder.toString();


            JSONParser jsonParser = new JSONParser();
            JSONObject json_obj = (JSONObject) jsonParser.parse(result);
            JSONObject getParkInfo = (JSONObject) json_obj.get("GetParkInfo");
            JSONArray json_arr = (JSONArray) getParkInfo.get("row");
            System.out.println("json_arr : " + json_arr.size());
            for(Object ob : json_arr) {
                JSONObject jso = (JSONObject) ob;
                // API와 미연계중인 데이터 가공 처리
                if(!jso.get("QUE_STATUS_NM").equals("미연계중")){
                    ParkingEntity pe = new ParkingEntity();
                    System.out.println(jso.toString());
                    if(jso.get("PARKING_TYPE_NM") != null && jso.get("LNG") !=null &&
                            jso.get("QUE_STATUS_NM") != null && jso.get("OPERATION_RULE_NM")!=null &&
                            jso.get("WEEKEND_END_TIME") != null && jso.get("WEEKEND_BEGIN_TIME") != null &&
                            jso.get("WEEKEND_BEGIN_TIME") != null && jso.get("PAY_NM") != null &&
                            jso.get("SATURDAY_PAY_NM") != null && jso.get("PARKING_NAME") != null &&
                            jso.get("HOLIDAY_END_TIME") != null && jso.get("HOLIDAY_PAY_NM") != null &&
                            !jso.get("FULLTIME_MONTHLY").equals("") && jso.get("ADDR") != null &&
                            jso.get("PARKING_CODE") != null && jso.get("HOLIDAY_BEGIN_TIME") != null &&
                            jso.get("HOLIDAY_PAY_YN") != null && !jso.get("TEL").equals("") &&
                            jso.get("NIGHT_FREE_OPEN_NM") != null && jso.get("LAT") != null &&
                            jso.get("SATURDAY_PAY_YN") != null && jso.get("HOLIDAY_PAY_YN") != null) {
                        pe.setType(jso.get("PARKING_TYPE_NM").toString());
                        pe.setLng(Double.parseDouble(jso.get("LNG").toString()));
                        pe.setPkstatus(jso.get("QUE_STATUS_NM").toString());
                        pe.setPkrule(jso.get("OPERATION_RULE_NM").toString());
                        pe.setEndweek(jso.get("WEEKEND_END_TIME").toString());
                        pe.setBeginweek(jso.get("WEEKEND_BEGIN_TIME").toString());
                        pe.setPaytype(jso.get("PAY_NM").toString());
                        pe.setSaturdaypay(jso.get("SATURDAY_PAY_NM").toString());
                        pe.setSaturdaypayyn(jso.get("SATURDAY_PAY_YN").toString());
                        pe.setPkname(jso.get("PARKING_NAME").toString());
                        pe.setEndholi(jso.get("HOLIDAY_END_TIME").toString());
                        pe.setPaytypeholi(jso.get("HOLIDAY_PAY_NM").toString());
                        pe.setHolipayyn(jso.get("HOLIDAY_PAY_YN").toString());
                        pe.setFullmon(Integer.parseInt(jso.get("FULLTIME_MONTHLY").toString()));
                        pe.setPkaddr(jso.get("ADDR").toString());
                        pe.setPkcode(jso.get("PARKING_CODE").toString());
                        pe.setBeginholi(jso.get("HOLIDAY_BEGIN_TIME").toString());
                        pe.setPaytypeholi(jso.get("HOLIDAY_PAY_YN").toString());
                        pe.setTel(jso.get("TEL").toString());
                        pe.setNightyn(jso.get("NIGHT_FREE_OPEN_NM").toString());
                        pe.setLat(Double.parseDouble(jso.get("LAT").toString()));
                        ps.insertParking(pe);
                    } else {
                        continue;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
