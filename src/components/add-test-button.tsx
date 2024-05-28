"use client";

import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
// ... other component imports
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Define the form schema with Zod
const formSchema = z.object({
  scenario: z.string().min(1, "Scenario is required"),
  status: z.enum(["pending", "pass", "fail"]),
  priority: z.enum(["high", "medium", "low"]),
  notes: z.string().optional(),
  isAutomated: z.boolean(),
});

export default function AddTestButton() {
  const [scenario, setScenario] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [notes, setNotes] = useState("");
  const [isAutomated, setIsAutomated] = useState(false);
  const testId = "test-id";

  const addTest = useMutation(api.tests.addTest);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scenario: "",
      status: "pending",
      priority: "medium",
      notes: "",
      isAutomated: false,
    },
  });

  const onSubmit = async (event: any) => {
    console.log("Submitting form...");
    event.preventDefault();
    try {
      // Call the addTest mutation with form data
      await addTest({
        testId: testId,
        automated: isAutomated,
        createdBy: "", // You'll need to replace these placeholders with actual values
        createdByImg: "",
        desc: scenario, // Use the scenario state for the description
        lastTested: "", // You might need to set a default value or leave it empty
        status: status,
        priority: priority,
        label: "", // Consider using a default label or allowing users to input it
        notes: notes,
      });
    } catch (error) {
      console.error("Error adding test:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 px-2 lg:px-3 ml-2">Open Form</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Test</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new test
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          {" "}
          {/* Wrap the form with Shadcn's Form component */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="scenario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scenario</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe the scenario" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Add FormMessage for error display */}
                </FormItem>
              )}
            />
            {/* Add other form fields (status, priority, etc.) similarly */}

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="pass">Pass</SelectItem>
                        <SelectItem value="fail">Fail</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage /> {/* Add FormMessage for error display */}
                </FormItem>
              )}
            />

            {/* ... (Add remaining form fields for priority, notes, and isAutomated) */}

            <DialogFooter>
              <Button type="submit">Save</Button>
              <div>
                <Button variant="outline">Cancel</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
