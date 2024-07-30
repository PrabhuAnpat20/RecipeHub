import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Typography from "@mui/material/Typography";
import Card from "./Card";

export default function TimelineComponent() {
  return (
    <div className=" md:grid grid-cols-12 gap-4 mx-2 md:mx-20 mb-4">
      <div className="hidden md:block col-span-5">
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
              <TimelineDot sx={{ bgcolor: "#FD6A31" }}>
                <RestaurantIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6" component="span">
                Read Recipe
              </Typography>
              <Typography className="text-slate-500">
                Search and read the recipe you want to cook
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
              <TimelineDot sx={{ bgcolor: "#FD6A31" }}>
                <SoupKitchenIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6" component="span">
                Prepare Ingredients
              </Typography>
              <Typography className="text-slate-500">
                Get the food ingredients that will be used
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
              <TimelineDot sx={{ bgcolor: "#FD6A31" }}>
                <LocalDiningIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6" component="span">
                Start Cooking
              </Typography>
              <Typography className="text-slate-500">
                Cook the dishes according to the instructions
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
              <TimelineDot sx={{ bgcolor: "#FD6A31" }}>
                <LocalDiningIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6" component="span">
                Enjoy your food
              </Typography>
              <Typography className="text-slate-500">
                Serve the food and enjoy with your family
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
      <div className=" md:hidden ">
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
              <TimelineDot sx={{ bgcolor: "#FD6A31" }}>
                <RestaurantIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h7" component="span">
                Read Recipe
              </Typography>
              <Typography className="text-slate-500 text-sm">
                Search and read the recipe you want to cook
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
              <TimelineDot sx={{ bgcolor: "#FD6A31" }}>
                <SoupKitchenIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h7" component="span">
                Prepare Ingredients
              </Typography>
              <Typography className="text-slate-500 text-sm">
                Get the food ingredients that will be used
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
              <TimelineDot sx={{ bgcolor: "#FD6A31" }}>
                <LocalDiningIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h7" component="span">
                Start Cooking
              </Typography>
              <Typography className="text-slate-500 text-sm">
                Cook the dishes according to the instructions
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
              <TimelineDot sx={{ bgcolor: "#FD6A31" }}>
                <LocalDiningIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "#FD6A31" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h7" component="span">
                Enjoy your food
              </Typography>
              <Typography className="text-slate-500 text-sm">
                Serve the food and enjoy with your family
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
      <div className=" col-span-7 ">
        <Card />
      </div>
    </div>
  );
}
