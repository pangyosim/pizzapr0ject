//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;
//import org.json.simple.parser.JSONParser;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.servlet.ModelAndView;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import com.web.repo.ParkingEntity;
//import com.web.service.ParkingRepository;
//
//import java.io.BufferedReader;
//import java.io.InputStreamReader;
//import java.net.URL;
//
//@Controller
//public class ParkController {
//
//   @Autowired
//   private ParkingRepository parkingRepository;
//
//   private static final Logger logger = LoggerFactory.getLogger(ParkController.class);
//
//   @GetMapping("/api")
//   public String index() {
//       return "index";
//   }
//
//   @PostMapping("/api")
//   public ModelAndView load_save(@RequestParam("date") String date) {
//       ModelAndView modelAndView = new ModelAndView("redirect:/findname");
//
//       try {
//           String requestDate = date;
//           URL url = new URL("http://openapi.seoul.go.kr:8088/7a706d586e72616934307852567176/json/GetParkInfo/1/1000/" + requestDate);
//           BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
//           String result = bf.readLine();
//
//           JSONParser jsonParser = new JSONParser();
//           JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
//           JSONObject getParkInfo = (JSONObject) jsonObject.get("GetParkInfo");
//           JSONArray rowArray = (JSONArray) getParkInfo.get("row");
//
//           for (int i = 0; i < rowArray.size(); i++) {
//               JSONObject rowObject = (JSONObject) rowArray.get(i);
//               ParkingEntity parkingEntity = new ParkingEntity();
//               parkingEntity.setPARKING_NAME((String) rowObject.get("PARKING_NAME"));
//               parkingEntity.setPARKING_CODE((String) rowObject.get("PARKING_NAME"));
//               parkingEntity.setPAY_NM((String) rowObject.get("PARKING_NAME"));
//               parkingEntity.setLAT((double) rowObject.get("PARKING_NAME"));
//               parkingEntity.setLNG((double) rowObject.get("PARKING_NAME"));
//               parkingEntity.setADDR((String) rowObject.get("ADDR"));
//               // 여기에서 필요한 필드들을 추가로 추출하여 ParkingEntity에 설정합니다.
//
//               // 데이터베이스에 저장
//               parkingRepository.save(parkingEntity);
//           }
//
//       } catch (Exception e) {
//           logger.error("데이터 처리 중 오류가 발생했습니다: " + e.getMessage(), e);
//       }
//
//       return modelAndView;
//   }
//}