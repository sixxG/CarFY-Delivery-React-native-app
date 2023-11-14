package carFy.delivery.auth;

import carFy.delivery.config.JwtService;
import carFy.delivery.models.contracts.ContractRepository;
import carFy.delivery.models.contracts.Status;
import carFy.delivery.models.user.Role;
import carFy.delivery.models.user.User;
import carFy.delivery.models.user.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.ZoneId;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository repository;
    ContractRepository contractRepository;
    PasswordEncoder passwordEncoder;
    JwtService jwtService;
    AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .fio(request.getFio())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.DELIVERY_MAN)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return  AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = repository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        ZoneId moscowZone = ZoneId.of("Europe/Moscow");
        var validTo = jwtService.extractAllClaims(jwtToken).getExpiration().toInstant().atZone(moscowZone).toLocalDateTime();
        var countDelivery = contractRepository.findAllByStatusAndDeliveryMan(Status.COMPLETED.getTitle(), user)
                .size();

        return  AuthenticationResponse.builder()
                .token(jwtToken)
                .username(request.getUsername())
                .role(user.getRole().name())
                .validUntil(validTo)
                .img(user.getImg())
                .countDelivery(countDelivery)
                .build();
    }
}
