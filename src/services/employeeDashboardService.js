import { supabase } from "../app/supabase";

/* ================= HELPERS ================= */

// profile_id is stored after login
const getProfileId = () => localStorage.getItem("profile_id");

/* ================= DASHBOARD DATA ================= */

export const getMyAttendance = async () => {
  const { data, error } = await supabase
    .from("attendance")
    .select("attendance_date, status, check_in, check_out")
    .eq("employee_id", getProfileId())
    .order("attendance_date", { ascending: false })
    .limit(7);

  if (error) throw error;
  return data;
};

export const getMyLeaves = async () => {
  const { data, error } = await supabase
    .from("leave_requests")
    .select("start_date, end_date, status")
    .eq("employee_id", getProfileId())
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getMyGrievances = async () => {
  const { data, error } = await supabase
    .from("grievances")
    .select("category, status, created_at")
    .eq("employee_id", getProfileId())
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getMyPayroll = async () => {
  const { data, error } = await supabase
    .from("payslips")
    .select("net_pay, payslip_url, created_at")
    .eq("employee_id", getProfileId())
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getMyTransfers = async () => {
  const { data, error } = await supabase
    .from("transfer_requests")
    .select("from_department, to_department, status, created_at")
    .eq("employee_id", getProfileId())
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
