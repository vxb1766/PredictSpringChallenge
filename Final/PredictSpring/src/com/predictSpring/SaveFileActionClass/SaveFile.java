package com.predictSpring.SaveFileActionClass;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class SaveFile
 */
public class SaveFile extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SaveFile() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		String action = request.getParameter("action");
		PrintWriter out = response.getWriter();
		String path = "C:\\Users\\VeenaBalasubramanya\\fkws\\PredictSpring\\SavedFiles\\";
		
		/*both the action's i.e load and save are mapped to this Servlet itself.
		The JSON data from client contains an action field that specifies if load/save is 
		being called. Note: No hidden fields are used. the data is explicitly passed via data field in AJAX*/
		switch (action) {
		case "load":
			out.write(loadAction(request, response, path));
			break;
		case "save":
			saveAction(request,response,path);
			break;
		default:
			out.write("invalid action!");
		}
		out.flush();
		out.close();
		

	}

	private void saveAction(HttpServletRequest request,
			HttpServletResponse response, String path) {
		// TODO Auto-generated method stub
		String fileName = request.getParameter("saveFile.name");
		String data = request.getParameter("saveFile.data");
		writeToFile(fileName, data, path);
		
	}

	private String loadAction(HttpServletRequest request,
			HttpServletResponse response, String path) {
		// TODO Auto-generated method stub
		String layoutToBeRetrieved = request.getParameter("loadLayout");
		String fileToBeRetrieved = path + layoutToBeRetrieved + ".txt";
		String content = readFromFile(fileToBeRetrieved);
		return content;
	}

	private String readFromFile(String fileToBeRetrieved) {
		// TODO Auto-generated method stub
		StringBuilder stringBuilder = new StringBuilder();
		String sCurrentLine = "";
		try (BufferedReader br = new BufferedReader(new FileReader(
				fileToBeRetrieved))) {
			while ((sCurrentLine = br.readLine()) != null) {
				stringBuilder.append(sCurrentLine);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return stringBuilder.toString();
	}

	

	public void writeToFile(String fileName, String content, String path) {

		try {
			File file = new File(path + fileName + ".txt");
			// if file doesnt exists, then create it
			if (!file.exists()) {
				file.createNewFile();
			}

			FileWriter fw = new FileWriter(file.getAbsoluteFile());
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(content);
			bw.close();
			System.out.println("Writing to file" + fileName);
			System.out.println("Done");

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
