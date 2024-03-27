
> 프로젝트 URL : &nbsp; 배포 준비중...

---
# 1.&nbsp;프로젝트 개요

### 1-1 프로젝트 기획 및 분석
#### &nbsp; 은행업무 보러가기 전 내 위치 주변  은행API의 현 대기인원을 제공함으로써 대기인원이 적은 은행을 선택해 더 빠른 업무처리를 해결하기 위한 목적과 차로 이동하는 고객을 위해 주변 주차장의 위치도 참고할수 있게 기획하였습니다.

### 1-2 프로젝트 개발환경 및 기술스택
> apache-tomcat 9.0.84 | Spring Boot 4 (STS4) | Java 11 | Oracle DataBase 11g

<img width="814" alt="스크린샷 2024-03-27 오후 1 19 52" src="https://github.com/pangyosim/pizzapr0ject/assets/87213815/925ef8bd-a485-4178-b80a-e345b6dff73d">


### 1-3 프로젝트 아키텍쳐


![final_archi drawio (1)](https://github.com/pangyosim/pizzapr0ject/assets/87213815/e4472177-fd73-4cfd-89a5-94b221a2c7f3)




---
# 2.&nbsp; 프로젝트 기능소개

### 2-1 기능 요약
~~~
메인페이지 
~~~

<img width="612" alt="image" src="https://github.com/pangyosim/pizzapr0ject/assets/87213815/c7b07b5f-40d3-41e4-b12d-4c7a54d98220">

~~~
로그인페이지
~~~
<img width="788" alt="image" src="https://github.com/pangyosim/pizzapr0ject/assets/87213815/f95dff56-8296-435f-8c15-4569ce23d5d3">

~~~
회원가입페이지 ( 입력값 검사 )
~~~

<img width="863" alt="image" src="https://github.com/pangyosim/pizzapr0ject/assets/87213815/d6e6d0d4-919e-4cf9-8408-2760fb8f8b60">

~~~
공지사항페이지 ( 사용자 & 관리자 )
~~~
--- 사용자 ---  

<img width="874" alt="image" src="https://github.com/pangyosim/pizzapr0ject/assets/87213815/04e46dcf-4e12-4f00-a32a-5ccb541b1a9a">


--- 관리자 ---  

<img width="867" alt="image" src="https://github.com/pangyosim/pizzapr0ject/assets/87213815/61d96aac-ca2a-4ab4-9920-54d54284f7ce">



~~~
Q&A페이지
~~~

<img width="898" alt="image" src="https://github.com/pangyosim/pizzapr0ject/assets/87213815/a2d8cb35-bd1f-4c15-b117-6b5bcfef0ee9">


~~~
내 근처 은행찾기 페이지
~~~


<img width="877" alt="image" src="https://github.com/pangyosim/pizzapr0ject/assets/87213815/ed0caf3f-3bbc-42ee-96a1-533ad810ec15">




~~~
내 근처 주차장찾기 페이지
~~~

<img width="894" alt="image" src="https://github.com/pangyosim/pizzapr0ject/assets/87213815/9145bf8a-16f2-4490-96da-beeabb75bdfa">

---


# 3.&nbsp; 프로젝트 개발결과
### 3-1 플로우 차트
![bank_flow drawio](https://github.com/pangyosim/pizzapr0ject/assets/87213815/dc5f8176-bedd-46e7-9371-4575eab2ea02)


### 3-2 Springboot Controller

#### ✅ &nbsp; TransController
- Naver Maps에 Marker로 표시하기 위해 주소값을 좌표값으로 변경 후 DB에 데이터 주입 부분
- 순서 : 공공데이터 API > Naver Geolocation API > DB저장

- 메인페이지 및 평균대기인원 데이터 구하기위해 @Scheduled Annotation으로 평일 9~17시 업무시간 중 매시간 20분마다 데이터 주입 부분.
```
package com.web.controller;

import com.web.repo.Bankaddr;
import com.web.repo.Waitrepo;
import com.web.service.BankaddrService;
import com.web.service.WaitrepoService;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@Controller
@PropertySource("classpath:application.properties")
public class TransController {

    @Autowired
    private BankaddrService bas;

    @Autowired
    private WaitrepoService was;

    @Value("${openapi.servicekey}")
    private String servicekey;

    @Value("${openapi.clientid}")
    private String clientId;

    @Value("${openapi.clientsecret}")
    private String clientSecret;
    @GetMapping("/trans")
    public void mainpage() throws IOException, ParseException {
        JSONArray res_arr = new JSONArray();
        JSONArray wait_arr = wait_current();
        if (wait_arr.size() > 1){
            for (Object o : wait_arr) {
                Bankaddr ba = new Bankaddr();
                JSONObject tmp = (JSONObject) o;
                JSONObject res_obj = new JSONObject();
                res_obj.put("brcd", tmp.get("brcd"));
                JSONObject addr = trans_brcd(tmp.get("brcd").toString());
                res_obj.put("krnBrm", addr.get("krnBrm"));
                System.out.println(addr.get("krnBrm"));
                ba.setBrcd(tmp.get("brcd").toString());
                ba.setKrnbrm(addr.get("krnBrm").toString());
                res_obj.put("brncNwBscAdr", addr.get("brncNwBscAdr"));
                ba.setBrncnwbscadr(addr.get("brncNwBscAdr").toString());
                JSONObject geo_obj = trans_geo(URLEncoder.encode(addr.get("brncNwBscAdr").toString() ,"UTF-8"));
                res_obj.put("geox",geo_obj.get("x"));
                ba.setGeox(Double.parseDouble(geo_obj.get("x").toString()));
                res_obj.put("geoy",geo_obj.get("y"));
                ba.setGeoy(Double.parseDouble(geo_obj.get("y").toString()));
                res_arr.add(res_obj);
                System.out.println(ba);
                bas.insertBankaddr(ba);
            }
            System.out.println("res_arr: " + res_arr);
        }
        res_arr.add("운영시간이 아닙니다");
        System.out.println("res_arr: " + res_arr);
    }

    @ResponseBody
    public JSONArray wait_current()  throws IOException, ParseException {
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
        Object ob = parser.parse(sb.toString());
        JSONObject obj = (JSONObject)ob;
        // 3. 필요한 리스트 데이터 부분만 가져와 JSONArray로 저장.
        return (JSONArray) obj.get("brcdList");
    }

    public JSONObject trans_brcd(String brcd) throws IOException, ParseException {
        StringBuilder brcdBuilder = new StringBuilder("http://apis.data.go.kr/B190021/branchinfo/details"); /*URL*/
        brcdBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + servicekey); /*Service Key*/
        brcdBuilder.append("&" + URLEncoder.encode("brcd","UTF-8") + "=" + URLEncoder.encode(brcd, "UTF-8")); /*부점코드를 조회하고자 하는 부점의 한글명*/
        URL brcd_url = new URL(brcdBuilder.toString());
        HttpURLConnection brcd_conn = (HttpURLConnection) brcd_url.openConnection();
        brcd_conn.setRequestMethod("GET");
        brcd_conn.setRequestProperty("Content-type", "application/json");
        System.out.println("brcd_Response code: " + brcd_conn.getResponseCode());
        BufferedReader brcd_rd;
        if(brcd_conn.getResponseCode() >= 200 && brcd_conn.getResponseCode() <= 300) {
            brcd_rd = new BufferedReader(new InputStreamReader(brcd_conn.getInputStream()));
        } else {
            brcd_rd = new BufferedReader(new InputStreamReader(brcd_conn.getErrorStream()));
        }
        StringBuilder brcd_sb = new StringBuilder();
        String brcd_line;
        while ((brcd_line = brcd_rd.readLine()) != null) {
            brcd_sb.append(brcd_line);
        }
        brcd_rd.close();
        brcd_conn.disconnect();
        JSONParser parser = new JSONParser();
        JSONObject res_obj = new JSONObject();
        JSONObject brcd_obj = (JSONObject)parser.parse(brcd_sb.toString());
        res_obj.put("krnBrm", brcd_obj.get("krnBrm"));
        res_obj.put("brncNwBscAdr", brcd_obj.get("brncNwBscAdr"));
        System.out.println("res_obj : " + res_obj);
        return res_obj;
    }

    @ResponseBody
    public JSONObject trans_geo(String address) throws ParseException {
        JSONObject res_obj = new JSONObject();
        StringBuilder html = new StringBuilder();
        String url = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=" + address; // encodeURIComponent로 인코딩 된 주소
        HttpClient client = HttpClientBuilder.create().build();
        HttpGet request = new HttpGet(url);
        request.addHeader("X-NCP-APIGW-API-KEY-ID", clientId);  //해더에 Clinet Id와 Client Secret을 넣습니다
        request.addHeader("X-NCP-APIGW-API-KEY", clientSecret);

        try {
            HttpResponse response = client.execute(request);
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(response.getEntity().getContent(), "UTF-8"));
            String current = "";
            while ((current = reader.readLine()) != null) {
                html.append(current);
            }
            reader.close();
            JSONParser parser = new JSONParser();
            res_obj = (JSONObject) parser.parse(html.toString());
            JSONArray geo_arr = (JSONArray) res_obj.get("addresses");
            if (!geo_arr.isEmpty()){
                JSONObject geo_add = (JSONObject) geo_arr.get(0);
                System.out.println("geo_add : " + geo_add);
                JSONObject geo_res = new JSONObject();
                geo_res.put("x", geo_add.get("x"));
                geo_res.put("y", geo_add.get("y"));
                System.out.println("geo_res : " + geo_res);
                return geo_res;
            } else {
                JSONObject opo = new JSONObject();
                opo.put("x", "127.2115749");
                opo.put("y", "37.3456429");
                return opo;
            }
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return res_obj;
    }
//    @Scheduled( zone = "Asia/Seoul", cron = "0 0/20 9-17 * * 1-6")
//    public void insertwait() throws IOException, ParseException {
//        System.out.println("Scheduled test ");
//        // 1. URL을 만들기 위한 StringBuilder.
//        StringBuilder urlBuilder = new StringBuilder("https://apis.data.go.kr/B190021/totBrStateInq/gettotBrStateInq"); /*URL*/
//        // 2. 오픈 API의요청 규격에 맞는 파라미터 생성, 발급받은 인증키.
//        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + servicekey); /*Service Key*/
//        // 3. URL 객체 생성.
//        URL url = new URL(urlBuilder.toString());
//        // 4. 요청하고자 하는 URL과 통신하기 위한 Connection 객체 생성.
//        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//        // 5. 통신을 위한 메소드 SET.
//        conn.setRequestMethod("GET");
//        // 6. 통신을 위한 Content-type SET.
//        conn.setRequestProperty("Content-type", "application/json");
//        // 7. 통신 응답 코드 확인.
//        System.out.println("Response code: " + conn.getResponseCode());
//        // 8. 전달받은 데이터를 BufferedReader 객체로 저장.
//        BufferedReader rd;
//        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
//            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//        } else {
//            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
//        }
//        // 9. 저장된 데이터를 라인별로 읽어 StringBuilder 객체로 저장.
//        StringBuilder sb = new StringBuilder();
//        String line;
//        while ((line = rd.readLine()) != null) {
//            sb.append(line);
//        }
//        // 10. 객체 해제.
//        rd.close();
//        conn.disconnect();
//        // 1. 문자열 형태의 JSON을 파싱하기 위한 JSONParser 객체 생성.
//        JSONParser parser = new JSONParser();
//        // 2. 문자열을 JSON 형태로 JSONObject 객체에 저장.
//        JSONObject obj = (JSONObject)parser.parse(sb.toString());
//        // 3. 필요한 리스트 데이터 부분만 가져와 JSONArray로 저장.
//        JSONArray wait_arr = (JSONArray) obj.get("brcdList");
//        if (wait_arr.size() > 1){
//            for(Object o : wait_arr){
//                Waitrepo wao = new Waitrepo();
//                JSONObject tmp = (JSONObject) o;
//                wao.setBrcd(tmp.get("brcd").toString());
//                JSONArray tlwnList = (JSONArray) tmp.get("tlwnList");
//                System.out.println(tlwnList.toString());
//                String[] arr = new String[5];
//                String[] waitpeople = new String[5];
//                for(int i=0; i<tlwnList.size();i++){
//                    JSONObject ot = (JSONObject) tlwnList.get(i);
//                    arr[i] = ot.get("trwnTgn").toString();
//                    waitpeople[i] = ot.get("waitCusCnt").toString();
//                }
//                System.out.println(Arrays.toString(arr));
//                System.out.println(Arrays.toString(waitpeople));
//                wao.setTrwntgn1(arr[0]);
//                wao.setTrwntgn2(arr[1]);
//                wao.setTrwntgn3(arr[2]);
//                wao.setTrwntgn4(arr[3]);
//                wao.setTrwntgn5(arr[4]);
//
//                wao.setWaitpeople1(waitpeople[0]);
//                wao.setWaitpeople2(waitpeople[1]);
//                wao.setWaitpeople3(waitpeople[2]);
//                wao.setWaitpeople4(waitpeople[3]);
//                wao.setWaitpeople5(waitpeople[4]);
//
//
//                ZoneId zone = ZoneId.of("Asia/Seoul");
//                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
//                String time = ZonedDateTime.now(zone).format(formatter);
//                wao.setCreateday(time);
//                System.out.println(wao.toString());
//                Bankaddr ba = bas.findByBrcd(tmp.get("brcd").toString());
//                wao.setAddr(ba.getBrncnwbscadr());
//
//                System.out.println(wao.toString());
//
//                was.insertwait(wao);
//                System.out.println("waitpeople Scheduled : " + wao);
//            }
//        } else {
//            System.out.println("영업시간이 아닙니다.");
//        }
//    }
}
```

#### ✅ &nbsp; MainController
- 공공데이터 API 업데이트에 따라 맵에 표시되는 데이터도 다르므로, DB데이터보다 상시 요청이 더 낫다 판단하여 상시 API 데이터 요청.
- /map 요청시 대기인원 현황 + 좌표값 데이터 React로 응답.
```
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
        // System.out.println(wait_list);
        List<Object> result = new ArrayList<>();
        // System.out.println(res.size());
        // System.out.println(wait_arr.size());
        if (wait_arr.size() > 2) {
            for (int k = 0; k < res.size(); k++) {
                    Map<String, Object> detail_wait = new HashMap<>();
                    Bankaddr baw = res.get(k);
                    // System.out.println("baw : " + baw);
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
            // System.out.println("result : " + result);
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
```

#### ✅ &nbsp; ParkController
- 주차장 정보를 불러오는 API : 주소 + 주차장이름 + 운영시간 + 요금

```
package com.web.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.web.repo.ParkingEntity;
import com.web.service.ParkService;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.List;


@RestController
@PropertySource("classpath:application.properties")
public class ParkController {

    @Value("${openapi.parking.servicekey}")
    private String servickey;
    @Autowired
    private ParkService ps;
    @GetMapping("/getpark")
    public List<ParkingEntity> getparking(){
        return ps.getParkingList(new ParkingEntity());
    }
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
```
---
# 4. &nbsp; 결론
#### &nbsp;  공공데이터 IBK기업은행 대기현황 API를 이용해, 창구별 대기 인원을 표시하여 보다 효율적인 시간관리를 할 수있게 서비스를 개발하였습니다. 또한, 주변 주차장 정보를 제공함으로써 편의성을 추가하였으며, 서비스를 이용하면서 불편하거나, 건의 사항들을 Q&A게시판을 만들어 고객과의 피드백으로 더 나은 서비스를 제공하는 환경을 만들었습니다.

