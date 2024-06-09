package com.PAF_DS_15_Team.paf.service;

import org.springframework.stereotype.Service;

import com.PAF_DS_15_Team.paf.DTO.ShareDTO;
import com.PAF_DS_15_Team.paf.model.SharePostModel;

import java.util.List;

@Service
public interface SharePostService {
    List<SharePostModel> getSharePosts();


    SharePostModel createSharePost(ShareDTO shareDTO);
    void deleteSharedPost(String id);

    List<SharePostModel> getSharePostsByuser(String id);
}
