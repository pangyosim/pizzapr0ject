package com.web.controller;

import com.web.repo.Bankaddr;
import com.web.service.BankaddrService;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@PropertySource("classpath:application.properties")
public class MainController {

    @Autowired
    private BankaddrService bas;

    @Value("${openapi.servicekey}")
    private String servicekey;

    @GetMapping("/map")
    public List<Bankaddr> mappage() throws IOException, ParseException {
        // 1. URL을 만들기 위한 StringBuilder.
        StringBuilder urlBuilder = new StringBuilder("https://apis.data.go.kr/B190021/totBrStateInq/gettotBrStateInq"); /*URL*/
        // 2. 오픈 API의요청 규격에 맞는 파라미터 생성, 발급받은 인증키.
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + servicekey); /*Service Key*/
        // 3. URL 객체 생성.
        URL url = new URL(urlBuilder.toString());
        // 4. 요청하고자 하는 URL과 통신하기 위한 Connection 객체 생성.
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        // 5. 통신을 위한 메소드 SET.
        conn.setRequestMethod("GET");
        // 6. 통신을 위한 Content-type SET.
        conn.setRequestProperty("Content-type", "application/json");
        // 7. 통신 응답 코드 확인.
        System.out.println("Response code: " + conn.getResponseCode());
        // 8. 전달받은 데이터를 BufferedReader 객체로 저장.
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        // 9. 저장된 데이터를 라인별로 읽어 StringBuilder 객체로 저장.
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        // 10. 객체 해제.
        rd.close();
        conn.disconnect();
        // 1. 문자열 형태의 JSON을 파싱하기 위한 JSONParser 객체 생성.
        JSONParser parser = new JSONParser();
        // 2. 문자열을 JSON 형태로 JSONObject 객체에 저장.
        JSONObject obj = (JSONObject)parser.parse(sb.toString());
        // 3. 필요한 리스트 데이터 부분만 가져와 JSONArray로 저장.
        JSONArray wait_arr = (JSONArray) obj.get("brcdList");
        List<Bankaddr> res = bas.getBankaddrList(new Bankaddr());
        
        // DB 조회된 brcd 값과 대기인원 brcd 값으로 현재 대기인원 포함한 객체 데이터 가공.
//        if(wait_arr.size() > 1 ){
//                for(Object o : wait_arr) {
//                    JSONObject wait_obj = (JSONObject) o;
//                    JSONArray detail_wait_arr = (JSONArray) wait_obj.get("tlwnList");
//                    res.add(bank_arr);
//                    System.out.println(detail_wait_arr);
//                for (Bankaddr b : bank_arr) {
//                    res.add(b);
//                    if(b.getBrcd().equals(wait_obj.get("brcd").toString()))
//                        for(Object detailo : detail_wait_arr){
//                            JSONObject detail_obj = (JSONObject) detailo;
//                            String wait_str = detail_obj.get("trwnTgn").toString() + " : "+ detail_obj.get("waitCusCnt").toString();
//                            res.add(wait_str);
//                        }
//                }
//                }
//        }
        return res;
    }
}
