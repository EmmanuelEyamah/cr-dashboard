import { create } from "zustand";
import { followUps } from "@/data/followUps";
import { complaints } from "@/data/complaints";
import { customers } from "@/data/customers";

export type NotifType = "overdue" | "escalated" | "at-risk" | "resolved";

export interface Notification {
  id: string;
  type: NotifType;
  title: string;
  sub: string;
  time: string;
  read: boolean;
}

const buildNotifications = (): Notification[] => [
  ...followUps
    .filter(f => f.status === "overdue")
    .map(f => ({
      id: `fu-${f.id}`,
      type: "overdue" as NotifType,
      title: `Overdue follow-up: ${f.title}`,
      sub: `${f.customerName} · Due ${f.dueDate}`,
      time: f.dueDate,
      read: false,
    })),
  ...complaints
    .filter(c => c.status === "escalated")
    .map(c => ({
      id: `cmp-${c.id}`,
      type: "escalated" as NotifType,
      title: `Escalated complaint: ${c.title}`,
      sub: c.customerName,
      time: c.createdAt,
      read: false,
    })),
  ...customers
    .filter(c => c.status === "at-risk")
    .slice(0, 4)
    .map(c => ({
      id: `risk-${c.id}`,
      type: "at-risk" as NotifType,
      title: `${c.name} is at risk of churning`,
      sub: `No purchase in ${Math.floor((Date.now() - new Date(c.lastPurchaseDate).getTime()) / 86400000)} days`,
      time: c.lastPurchaseDate,
      read: false,
    })),
  ...complaints
    .filter(c => c.status === "resolved")
    .slice(0, 2)
    .map(c => ({
      id: `res-${c.id}`,
      type: "resolved" as NotifType,
      title: `Complaint resolved: ${c.title}`,
      sub: c.customerName,
      time: c.createdAt,
      read: true,
    })),
];

interface NotificationStore {
  notifications: Notification[];
  markRead: (id: string) => void;
  markAllRead: () => void;
  markSelectedRead: (ids: string[]) => void;
  remove: (id: string) => void;
  removeSelected: (ids: string[]) => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: buildNotifications(),

  markRead: (id) =>
    set(s => ({
      notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    })),

  markAllRead: () =>
    set(s => ({ notifications: s.notifications.map(n => ({ ...n, read: true })) })),

  markSelectedRead: (ids) =>
    set(s => ({
      notifications: s.notifications.map(n => ids.includes(n.id) ? { ...n, read: true } : n),
    })),

  remove: (id) =>
    set(s => ({ notifications: s.notifications.filter(n => n.id !== id) })),

  removeSelected: (ids) =>
    set(s => ({ notifications: s.notifications.filter(n => !ids.includes(n.id)) })),

  unreadCount: () => get().notifications.filter(n => !n.read).length,
}));
