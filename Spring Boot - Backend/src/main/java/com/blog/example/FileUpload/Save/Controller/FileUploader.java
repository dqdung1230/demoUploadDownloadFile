package com.blog.example.FileUpload.Save.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.websocket.server.PathParam;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class FileUploader {

    List<String> files = new ArrayList<String>();
    private final Path uploadLocation = Paths.get("D:\\ProjectTest\\UploadFile\\FileUploaded\\");
    private final Path downloadLocation = Paths.get("D:\\ProjectTest\\UploadFile\\FileDownloaded\\");

    @PostMapping("/uploadFile")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String message;
        try {
            try {
                String name = file.getOriginalFilename();
                Files.copy(file.getInputStream(), this.uploadLocation.resolve(name));
            } catch (Exception e) {
                throw new RuntimeException("FAIL!");
            }
            files.add(file.getOriginalFilename());

            message = "Successfully uploaded!";
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "Failed to upload!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

    @GetMapping("/downloadFile/{filename}")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable("filename") String filename) {
        try {
            File file = new File(uploadLocation +  "/" + filename);
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

            return ResponseEntity.status(HttpStatus.OK).contentLength(file.length()).body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
        }
    }
//	//  đọc file
//	@GetMapping("/getFile")
//	public ResponseEntity<ByteArrayResource> handleFileDownload(@PathVariable String filename) {
//		try {
//			byte[] datas = Files.readAllBytes(this.rootLocation.resolve(filename));
//			ByteArrayResource resource = new ByteArrayResource(datas);
//			return ResponseEntity.status(HttpStatus.OK).body(resource);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}


}
