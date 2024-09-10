import React, { useState } from "react";
import Header from "../../../components/myPage/myPageHeader";
import Footer from "../../../components/main/footer";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Notification = () => {
  const [expanded, setExpanded] = useState(false);
  const notices = [
    {
      id: 1,
      title: "가입을 환영합니다!",
      content:
        "파란장터에 가입하신 것을 환영합니다. 학우들과 안전한 거래를 해보세요!",
      date: "2024-09-01",
    },
    {
      id: 2,
      title: "파란장터 공식 이메일 안내드립니다.",
      content:
        "사이트에 대한 기타 건의사항은 endofpage20@gmail.com으로 메일 부탁드립니다.",
      date: "2024-09-01",
    },
  ];

  const handleContent = (index) => {
    setExpanded(expanded === index ? false : index);
  };

  const sortedNotices = notices.sort((a, b) => b.id - a.id);

  return (
    <div>
      <Header title="공지사항" />
      <Container mt={4} mb={4} sx={{ marginTop: "20px" }}>
        {sortedNotices.map((notice, index) => (
          <Accordion
            key={notice.id}
            expanded={expanded === index}
            onChange={() => handleContent(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={(event) => {
                event.stopPropagation();
                handleContent(index);
              }}
            >
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="baseline"
                flexDirection="column"
              >
                <Typography>{`${notice.id}.   ${notice.title}`}</Typography>
                <Typography variant="caption" gutterBottom>
                  {new Date(notice.date).toLocaleDateString()}
                </Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="textSecondary">
                {notice.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
      <Footer />
    </div>
  );
};

export default Notification;
