import * as React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

interface AppFooterProps {
  stackOverflowUrl?: string;
}

export default function AppFooter(props: AppFooterProps) {
  const { stackOverflowUrl } = props;

  return (
    <Container component="footer">
      <Divider />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent={{ sm: "space-between" }}
        gap={{ xs: 2, sm: 1 }}
        sx={{ my: 4 }}
      >
        <Typography color="text.tertiary" variant="caption" fontWeight={400}>
          Copyright © {new Date().getFullYear()} ASK
        </Typography>
        {/* <Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap>
          <IconButton
            target="_blank"
            rel="noopener"
            href="https://github.com/mui"
            aria-label="github"
            title="GitHub"
            size="small"
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
          <IconButton
            target="_blank"
            rel="noopener"
            href={""}
            aria-label="RSS Feed"
            title="RSS Feed"
            size="small"
          >
            <RssFeedIcon fontSize="small" />
          </IconButton>
          <IconButton
            target="_blank"
            rel="noopener"
            href="https://twitter.com/MUI_hq"
            aria-label="twitter"
            title="X"
            size="small"
          >
            <XIcon fontSize="small" />
          </IconButton>
          <IconButton
            target="_blank"
            rel="noopener"
            href="https://www.linkedin.com/company/mui/"
            aria-label="linkedin"
            title="LinkedIn"
            size="small"
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
          <IconButton
            target="_blank"
            rel="noopener"
            href="https://www.youtube.com/@MUI_hq"
            aria-label="YouTube"
            title="YouTube"
            size="small"
          >
            <YouTubeIcon fontSize="small" />
          </IconButton>
          <IconButton
            target="_blank"
            rel="noopener"
            href="https://mui.com/r/discord/"
            aria-label="Discord"
            title="Discord"
            size="small"
          ></IconButton>
        </Stack> */}
      </Stack>
    </Container>
  );
}
