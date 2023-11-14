package carFy.delivery.controllers;

import carFy.delivery.models.delivery.ChangePasswordRequest;
import carFy.delivery.models.user.UserDto;
import carFy.delivery.sevice.DeliveryMan.DeliveryManService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController()
@RequestMapping("/api/v1/deliverymans")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeliveryManController {
    DeliveryManService service;

    @GetMapping()
    public ResponseEntity getAllDeliveryMans() {
        try {
            return ResponseEntity.ok().body(service.getAllDeliveryMans());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{login}")
    public ResponseEntity getDeliveryManByLogin(@PathVariable String login) {
        try {
            return ResponseEntity.ok().body(service.getDeliveryManByLogin(login));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get-active-delivery")
    public ResponseEntity getActiveDelivery(Principal user) {
        try {
            return ResponseEntity.ok().body(service.getActiveDelivery(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity changePassword(@RequestBody ChangePasswordRequest request, Principal user) {
        try {
            service.changePassword(request, user);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity updateDeliverymanData(@RequestBody UserDto deliveryman) {
        try {
            return ResponseEntity.ok().body(service.updateDeliverymanData(deliveryman));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
