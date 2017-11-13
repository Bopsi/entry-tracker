package com.cts.entry.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ATTENDEE")
public class Attendee {
	@Id
	private String id;
	private String name;
	private boolean registered;
	private boolean hightea;
	private boolean luncheon;

	public Attendee() {

	}

	public Attendee(String id, String name, boolean registered, boolean hightea, boolean luncheon) {
		super();
		this.id = id;
		this.name = name;
		this.registered = registered;
		this.hightea = hightea;
		this.luncheon = luncheon;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isRegistered() {
		return registered;
	}

	public void setRegistered(boolean registered) {
		this.registered = registered;
	}

	public boolean isHightea() {
		return hightea;
	}

	public void setHightea(boolean hightea) {
		this.hightea = hightea;
	}

	public boolean isLuncheon() {
		return luncheon;
	}

	public void setLuncheon(boolean luncheon) {
		this.luncheon = luncheon;
	}

}
