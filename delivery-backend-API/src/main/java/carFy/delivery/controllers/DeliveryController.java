package carFy.delivery.controllers;

import carFy.delivery.models.delivery.DeliveryStatisticRequest;
import carFy.delivery.sevice.Delivery.DeliveryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@RestController()
@RequestMapping("/api/v1/deliveries")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeliveryController {

    DeliveryService service;

    @GetMapping("/delivery-man-statistic/{deliverymanId}/{dateStart}/{dateEnd}")
    public ResponseEntity getStatisticForDeliveryMan(@PathVariable Map<String, String> pathVarsMap) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

            LocalDate dateStart = LocalDate.parse(pathVarsMap.get("dateStart"), formatter);
            LocalDate dateEnd = LocalDate.parse(pathVarsMap.get("dateStart"), formatter);

            DeliveryStatisticRequest request = new DeliveryStatisticRequest();
            request.setDeliveryId(Long.valueOf(pathVarsMap.get("deliverymanId")));
            request.setDateStart(dateStart);
            request.setDateEnd(dateEnd);

            return ResponseEntity.ok().body(service.getStatisticByPeriodForDeliveryMan(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
