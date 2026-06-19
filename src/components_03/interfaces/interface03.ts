interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  isAdmin: boolean;
  createdAt: Date;
}

// 1.
type UpdatePayload = Partial<
  Omit<UserProfile, "id" | "isAdmin" | "createdAt">
> & {
  fofo: string;
};

const updateUser: UpdatePayload = { fofo: "Fofo" };

// 2.
type UserPreview = Pick<UserProfile, "username" | "avatarUrl"> & {
  fofo: string;
};

// 3.
type RegistrationPayload = Omit<UserProfile, "id" | "createdAt">;

// 4.
type SecureUser = Readonly<UserProfile>;

// -----------------------------------------
const TicketPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

type TicketPriorityType = (typeof TicketPriority)[keyof typeof TicketPriority];

const TicketStatus: Record<string, string> = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  CLOSED: "CLOSED",
} as const;

type TicketStatusType = (typeof TicketStatus)[keyof typeof TicketStatus];

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  priority: TicketPriorityType;
  status: TicketStatusType;
  assignedTo: string | null;
  createdAt: Date;
}

// 1.
type ChangeStatusPayload = Pick<SupportTicket, "status" | "assignedTo">;

// 2.
type PrioritySLA = Record<TicketPriorityType, number>;

const prioritySLA: PrioritySLA = {
  CRITICAL: 20,
  HIGH: 30,
  MEDIUM: 60,
  LOW: 90,
};

// If TicketPriority is 'enum'
enum TicketPriorityEnum {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

type PrioritySLAEnum = Record<TicketPriorityEnum, number>;

const prioritySLA02: PrioritySLAEnum = {
  [TicketPriorityEnum.CRITICAL]: 20,
  [TicketPriorityEnum.HIGH]: 30,
  [TicketPriorityEnum.MEDIUM]: 60,
  [TicketPriorityEnum.LOW]: 90,
};

// 3.
type UrgentTicket = Omit<SupportTicket, "priority"> & { pagerDutyId: string };
