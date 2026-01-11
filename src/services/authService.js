import { supabase } from "../app/supabase";

/* =====================================================
   SIGN UP
   ===================================================== */
export const signUp = async (email, password, role) => {
  // 1. Check if profile already exists
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (existingProfile) {
    throw new Error("User already exists");
  }

  // 2. Create profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .insert({
      email,
      password, // demo-only
            role,

    })
    .select()
    .single();

  if (profileError) throw profileError;

  // 3. Create employee with role
  const { error: employeeError } = await supabase
    .from("employees")
    .insert({
      profile_id: profile.id,
    });

  if (employeeError) throw employeeError;
};

/* =====================================================
   LOGIN
   ===================================================== */
export const signIn = async (email, password) => {
  // 1. Validate profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, role")
    .eq("email", email)
    .eq("password", password)
    .single();
  if (profileError || !profile) {
    throw new Error("Invalid email or password");
  }

  // 2. Fetch employee role
  if(profile.role !== 'admin'){
  const { data: employee, error: employeeError } = await supabase
    .from("employees")
    .select("*")
    .eq("profile_id", profile.id)
    .single();
  
  if (employeeError || !employee) {
    throw new Error("Employee record not found");
  }
  }
  // 3. Store session (frontend-only)
  localStorage.setItem("user", JSON.stringify({
    profileId: profile.id,
    employeeId: profile.role === 'admin' ? null : employee.id,
    email: profile.email,
    role: profile.role,
  }));
  // console.log("ROLE:", profile);
  // console.log("EMPLOYEE ROLE:", employee.role);
  localStorage.setItem("role", profile.role);

  return profile.role;
};

/* =====================================================
   LOGOUT
   ===================================================== */
export const signOut = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};

/* =====================================================
   HELPERS
   ===================================================== */
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getStoredRole = () => {
  return localStorage.getItem("role");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};
