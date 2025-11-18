import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import logo from "@/assets/roar-logo.png";
import { ArrowLeft } from "lucide-react";

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be less than 100 characters"),
});

const signupSchema = loginSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(isSignupMode ? signupSchema : loginSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      if (isSignupMode) {
        // Signup flow
        const { data: authData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin/dashboard`,
          },
        });

        if (error) throw error;

        if (!authData.user) {
          throw new Error("Signup failed");
        }

        // Wait a moment for trigger to assign admin role
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if user got admin role
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", authData.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (!roleData) {
          await supabase.auth.signOut();
          throw new Error("Failed to assign admin role. Please contact support.");
        }

        toast({
          title: "Success",
          description: "Admin account created successfully!",
        });

        navigate("/admin/dashboard");
      } else {
        // Login flow
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;

        // Check if user is admin
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", authData.user.id)
          .eq("role", "admin")
          .single();

        if (!roleData) {
          await supabase.auth.signOut();
          throw new Error("You don't have admin access");
        }

        toast({
          title: "Success",
          description: "Welcome back, admin!",
        });

        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isSignupMode ? 'signup' : 'login'}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-premium flex items-center justify-center px-6 relative">
      <Button
        onClick={() => navigate("/")}
        variant="outline"
        className="absolute top-6 left-6 border-white text-white hover:bg-white/10 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Website
      </Button>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <img src={logo} alt="ROAR Exim" className="h-24 w-auto mx-auto" />
          <h1 className="text-3xl font-bold text-white">
            {isSignupMode ? "Create Admin Account" : "Admin Login"}
          </h1>
          <p className="text-gray-300">
            {isSignupMode ? "Create the first admin account" : "Sign in to access the admin panel"}
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-2xl p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="admin@roarexim.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isSignupMode && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                {isLoading 
                  ? (isSignupMode ? "Creating account..." : "Signing in...") 
                  : (isSignupMode ? "Create Admin Account" : "Sign In")}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-white hover:text-gray-300" 
                onClick={() => {
                  setIsSignupMode(!isSignupMode);
                  form.reset();
                }}
              >
                {isSignupMode 
                  ? "Already have an account? Sign in" 
                  : "Need to create the first admin? Sign up"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
