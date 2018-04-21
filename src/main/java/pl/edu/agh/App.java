package pl.edu.agh;

import org.springframework.boot.SpringApplication;

public class App {

    public static void main (String[] args) {
        System.out.println("Welcome in UX book endings store application.");
        SpringApplication.run(AppConfiguration.class, args);
    }
}
