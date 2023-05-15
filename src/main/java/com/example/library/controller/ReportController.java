package com.example.library.controller;

import com.example.library.dto.GenerateReportDTO;
import com.example.library.dto.IssueDetailsDTO;
import com.example.library.dto.ReturnDetailsDTO;
import com.example.library.dto.SaveDetailsDTO;
import com.example.library.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    //get all details
    @GetMapping(path="/getAllDetails")
    public List<GenerateReportDTO> getAllDetails()
    {
        List<GenerateReportDTO> allDetails=reportService.getAllDetails();
        return allDetails;
    }

    //get issue details
    @GetMapping(path="/getIssueDetails")
    public List<IssueDetailsDTO> getAllIssueDetails() {
        return reportService.getAllIssueDetails();
    }

    //get return details

    @GetMapping(path="/getReturnDetails")
    public List<ReturnDetailsDTO> getAllReturnDetails() {
        return reportService.getAllReturnDetails();
    }

    //to save details
    @PostMapping(path="/SaveDetails")
    public SaveDetailsDTO saveDetails(@RequestBody SaveDetailsDTO saveDetailsDTO) {
        return reportService.saveDetails(saveDetailsDTO);
    }
}
