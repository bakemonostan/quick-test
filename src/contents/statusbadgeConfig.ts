interface StatusBadgeConfig {
  color: string;
  dotColor: string;
  textColor: string;
  label: string;
}

export const statusConfig: Record<string, StatusBadgeConfig> = {
  success: {
    color: "green.2",
    dotColor: "bg-success/78",
    textColor: "green.9",
    label: "Success",
  },
  active: {
    color: "green.2",
    dotColor: "bg-success/78",
    textColor: "green.9",
    label: "Active",
  },
  pending: {
    color: "yellow.2",
    dotColor: "bg-warning/78",
    textColor: "yellow.9",
    label: "Pending",
  },
  paused: {
    color: "gray.2",
    dotColor: "bg-gray-400",
    textColor: "gray.9",
    label: "Paused",
  },
  review: {
    color: "blue.2",
    dotColor: "bg-info/78",
    textColor: "blue.9",
    label: "In Review",
  },
  cancelled: {
    color: "red.2",
    dotColor: "bg-destructive/78",
    textColor: "red.9",
    label: "Cancelled",
  },
  "not approved": {
    color: "red.2",
    dotColor: "bg-destructive/78",
    textColor: "red.9",
    label: "Not Approved",
  },
};
