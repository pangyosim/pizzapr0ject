package com.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.repo.Bankaddr;
import com.web.repo.RefineWaitrepo;
import com.web.repo.Waitrepo;
import com.web.service.BankaddrService;
import com.web.service.RefineWaitrepoService;
import com.web.service.WaitrepoService;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
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

    @Autowired
    private RefineWaitrepoService rws;

    @GetMapping("/map")
    public List<Object> mappage() throws IOException, ParseException {
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
        Object obz = parser.parse(sb.toString());
        JSONObject obj = (JSONObject)obz;
        // 3. 필요한 리스트 데이터 부분만 가져와 JSONArray로 저장.
        JSONArray wait_arr = (JSONArray) obj.get("brcdList");
        List<Bankaddr> res = bas.getBankaddrList(new Bankaddr());
        // DB 조회된 brcd 값과 대기인원 brcd 값으로 현재 대기인원 포함한 객체 데이터 가공.
        List<Object> wait_list = new ArrayList<>();
        for(Object ob : wait_arr){
            Map<String, Object> tmp_map = new HashMap<>();
            JSONObject job = (JSONObject) ob;
            JSONArray jsr = (JSONArray) job.get("tlwnList");
            for(int i=0;i<jsr.size();i++){
                Object obw = jsr.get(i);
                JSONObject jw = (JSONObject) obw;
                tmp_map.put("trwntgn"+(i+1),jw.get("trwnTgn"));
                tmp_map.put("waitcuscnt"+(i+1),jw.get("waitCusCnt"));
            }
            wait_list.add(tmp_map);
        }
        System.out.println(wait_list);
        List<Object> result = new ArrayList<>();
        System.out.println(res.size());
        System.out.println(wait_arr.size());
        if (wait_arr.size() > 2) {
            for (int k = 0; k < res.size(); k++) {
                    Map<String, Object> detail_wait = new HashMap<>();
                    Bankaddr baw = res.get(k);
                    System.out.println("baw : " + baw);
                    detail_wait.put("seq", baw.getSeq());
                    detail_wait.put("krnbrm", baw.getKrnbrm());
                    detail_wait.put("brncnwbscadr", baw.getBrncnwbscadr());
                    detail_wait.put("geox", baw.getGeox());
                    detail_wait.put("geoy", baw.getGeoy());
                    ObjectMapper obm = new ObjectMapper();
                    Map<String, Object> map = obm.convertValue(wait_list.get(k), Map.class);
                    detail_wait.put("trwntgn1", map.get("trwntgn1"));
                    detail_wait.put("waitcuscnt1", map.get("waitcuscnt1"));
                    detail_wait.put("trwntgn2", map.get("trwntgn2"));
                    detail_wait.put("waitcuscnt2", map.get("waitcuscnt2"));
                    detail_wait.put("trwntgn3", map.get("trwntgn3"));
                    detail_wait.put("waitcuscnt3", map.get("waitcuscnt3"));
                    detail_wait.put("trwntgn4", map.get("trwntgn4"));
                    detail_wait.put("waitcuscnt4", map.get("waitcuscnt4"));
                    detail_wait.put("trwntgn5", map.get("trwntgn5"));
                    detail_wait.put("waitcuscnt5", map.get("waitcuscnt5"));
                    result.add(detail_wait);
            }
            System.out.println("result : " + result);
        } else {
            for (Bankaddr ba : res) {
                Map<String, Object> detail = new HashMap<>();
                detail.put("seq", ba.getSeq());
                detail.put("krnbrm", ba.getKrnbrm());
                detail.put("brncnwbscadr", ba.getBrncnwbscadr());
                detail.put("geox", ba.getGeox());
                detail.put("geoy", ba.getGeoy());
                detail.put("tncdCon", obj.get("tncdCon").toString());
                result.add(detail);
            }
            System.out.println("영업시간이 아닙니다.");
        }

        return result;
    }

    @GetMapping("/minwait")
    public List<RefineWaitrepo> minwait(){
        List<RefineWaitrepo> rewait = rws.getWaitrepoList(new RefineWaitrepo());
        System.out.println(rewait);
//        List<Waitrepo> tmp_list = new ArrayList<>();
//        for(RefineWaitrepo rw : rewait){
//            if ()
//        }
        return rewait;
    }
}
