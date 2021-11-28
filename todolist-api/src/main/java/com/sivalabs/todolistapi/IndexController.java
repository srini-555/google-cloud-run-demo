package com.sivalabs.todolistapi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class IndexController {

    @GetMapping
    public Map<String, String> index() {
        return Map.of("app", "SpringBootTodoList", "version", "1.0.0");
    }
}
