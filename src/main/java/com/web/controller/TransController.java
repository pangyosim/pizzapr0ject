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
