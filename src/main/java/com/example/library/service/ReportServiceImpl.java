package com.example.library.service;

import com.example.library.dto.GenerateReportDTO;
import com.example.library.dto.IssueDetailsDTO;
import com.example.library.dto.ReturnDetailsDTO;
import com.example.library.dto.SaveDetailsDTO;
import com.example.library.entity.Report;
import com.example.library.repository.ReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService{
    @Autowired
    private ReportRepo reportRepo;

    @Override
    public List<GenerateReportDTO> getAllDetails() {
        List<Report> getDetails = reportRepo.findAll();
        List<GenerateReportDTO> generateReportDTOList = new ArrayList<>();
        for(Report a:getDetails){
            GenerateReportDTO generateReportDTO = new GenerateReportDTO(
                    a.getRegNo(),
                    a.getSname(),
                    a.getBookName(),
                    a.getNoOfBooks(),
                    a.getIssueDate(),
                    a.getReturnDate(),
                    a.getFine()
            );
            generateReportDTOList.add(generateReportDTO );
        }
        return generateReportDTOList;
    }


    @Override
    public List<IssueDetailsDTO> getAllIssueDetails() {
        List<Report> issueDetailsList = reportRepo.findAll();
        List<IssueDetailsDTO> issueDetailsDTOList = new ArrayList<>();
        for (Report b: issueDetailsList) {
            IssueDetailsDTO issueDetailsDTO = new IssueDetailsDTO(
                    b.getRegNo(),
                    b.getSname(),
                    b.getBookName(),
                    b.getNoOfBooks(),
                    b.getIssueDate()
            );
            issueDetailsDTOList.add(issueDetailsDTO);
        }
        return issueDetailsDTOList;
    }



    @Override
    public List<ReturnDetailsDTO> getAllReturnDetails() {
        List<Report> returnDetailsList = reportRepo.findAll();
        List<ReturnDetailsDTO> returnDetailsDTOList = new ArrayList<>();
        for (Report c : returnDetailsList) {
            ReturnDetailsDTO returnDetailsDTO = new ReturnDetailsDTO(
                    c.getRegNo(),
                    c.getSname(),
                    c.getReturnDate(),
                    c.getFine()
            );
            returnDetailsDTOList.add(returnDetailsDTO);
        }
        return returnDetailsDTOList;
    }

    @Override
    public SaveDetailsDTO saveDetails(SaveDetailsDTO saveDetailsDTO) {
        Report report = new Report();
        // map properties from saveDetailsDTO to report
        report.setRegNo(saveDetailsDTO.getRegNo());
        report.setSname(saveDetailsDTO.getSname());
        report.setBookName(saveDetailsDTO.getBookName());
        report.setNoOfBooks(saveDetailsDTO.getNoOfBooks());
        report.setIssueDate(saveDetailsDTO.getIssueDate());
        report.setReturnDate(saveDetailsDTO.getReturnDate());
        report.setFine(saveDetailsDTO.getFine());
        reportRepo.save(report);
        return saveDetailsDTO;
    }





}
