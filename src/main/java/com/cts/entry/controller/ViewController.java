package com.cts.entry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	@RequestMapping("/home")
	public String home() {
		//System.out.println("userinfo");
		return "index.html";
	}
	
	@RequestMapping("/userInfo")
	public String userinfo() {
		//System.out.println("userinfo");
		return "user.html";
	}

	@RequestMapping("/eventInfo")
	public String eventInfo() {
		//System.out.println("eventInfo");
		return "event.html";
	}
}
