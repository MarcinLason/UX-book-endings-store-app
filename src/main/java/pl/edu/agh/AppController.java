package pl.edu.agh;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class AppController {

    @RequestMapping("/books")
    public String getBooks() {
        return "books.html";
    }
}
