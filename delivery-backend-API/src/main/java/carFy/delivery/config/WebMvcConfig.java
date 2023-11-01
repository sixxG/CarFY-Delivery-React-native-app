package carFy.delivery.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String filePathCars = "C:/Users/Oleg/Desktop/Project-CarRental/img/cars/";

        registry.addResourceHandler("/imageCar/**")
                .addResourceLocations("file:/"+filePathCars);
    }
}
