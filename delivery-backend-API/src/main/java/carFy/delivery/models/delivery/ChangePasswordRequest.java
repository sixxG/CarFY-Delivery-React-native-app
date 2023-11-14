package carFy.delivery.models.delivery;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode
@ToString
public class ChangePasswordRequest {
    char[] oldPassword;
    char[] newPassword;
    char[] confirmPassword;
}
