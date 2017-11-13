package com.cts.entry.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "INVITATIONLIST")
public class Invited {
	@Id
	private String id;
	private String name;
	private String grade;
	private String client;
	private String project;
	private String manager;
	private String office;
	private String department;

	public Invited() {

	}

	public Invited(String id, String name, String grade, String client, String project, String manager, String office, String department) {
		super();
		this.id = id;
		this.name = name;
		this.grade = grade;
		this.client = client;
		this.project = project;
		this.manager = manager;
		this.office = office;
		this.department = department;
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

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getOffice() {
		return office;
	}

	public void setOffice(String office) {
		this.office = office;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

}
