package com.example.library.service;

import com.example.library.dto.GenerateReportDTO;
import com.example.library.dto.IssueDetailsDTO;
import com.example.library.dto.ReturnDetailsDTO;
import com.example.library.dto.SaveDetailsDTO;

import java.util.List;

public interface ReportService {
    List<GenerateReportDTO> getAllDetails();

    List<IssueDetailsDTO> getAllIssueDetails();

    List<ReturnDetailsDTO> getAllReturnDetails();

    SaveDetailsDTO saveDetails(SaveDetailsDTO saveDetailsDTO);
}
