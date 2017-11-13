package com.cts.entry.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cts.entry.model.Attendee;
import com.cts.entry.model.AttendeeRepository;
import com.cts.entry.model.Invited;
import com.cts.entry.model.InvitedRepository;

@RestController
public class EntryTrackerController {

	@Autowired
	private AttendeeRepository attendeeRepository;

	@Autowired
	private InvitedRepository invitedRepository;

	@RequestMapping("/")
	String home() {
		return "Hello World!";
	}

	@RequestMapping(path = "/checkInvited", method = RequestMethod.GET)
	public Invited checkInvited(@RequestParam String id) {
		return invitedRepository.findOne(id);
	}

	@RequestMapping(path = "/registerInvited", method = RequestMethod.GET)
	public Attendee registerInvited(@RequestParam String id, @RequestParam String name) {
		Attendee attendee = attendeeRepository.findOne(id);
		if (attendee == null) {
			attendee = new Attendee();
			attendee.setId(id);
			attendee.setName(name);
			attendeeRepository.save(attendee);
		}
		return attendee;
	}

	@RequestMapping(path = "/updateAttendee", method = RequestMethod.POST)
	public Attendee updateAttendee(@RequestBody Attendee attendee) {
		return attendeeRepository.save(attendee);
	}

	@RequestMapping(path = "/getAllAttendee", method = RequestMethod.GET)
	public Iterable<Attendee> getAllAttendee() {
		//long attendees = attendeeRepository.count();
		//System.out.println("Attendee count : " + attendees);
		return attendeeRepository.findAll();
	}

	@RequestMapping(path = "/clear", method = RequestMethod.GET)
	public void clear() {
		attendeeRepository.deleteAll();
	}

	@RequestMapping(path = "/getAttendee/{id}", method = RequestMethod.GET)
	public Attendee getAttendee(@PathVariable String id) {
		Attendee one = attendeeRepository.findOne(id);
		//System.out.println(one.getName());
		return one;
	}

	@RequestMapping(path = "/getInvitationList", method = RequestMethod.GET)
	public Iterable<Invited> getInvitationList() {
		//long inviteds = invitedRepository.count();
		//System.out.println("Invited count : " + inviteds);
		return invitedRepository.findAll();
	}
}
