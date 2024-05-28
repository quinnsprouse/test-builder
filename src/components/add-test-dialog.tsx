"use client";
/** * v0 by Vercel. * @see https://v0.dev/t/2GOgRoVfG8h * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app */
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function AddTestButton() {
  const [scenario, setScenario] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [notes, setNotes] = useState("");
  const [isAutomated, setIsAutomated] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const testId = "test-id";

  const addTest = useMutation(api.tests.addTest);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await addTest({
        testId: testId,
        automated: isAutomated,
        createdBy: "",
        createdByImg: "",
        desc: scenario,
        lastTested: "",
        status: status,
        priority: priority,
        label: "",
        notes: notes,
      });

      setOpen(false);
    } catch (error) {
      console.error("Error adding test:", error);
    }
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handleTypeChange = (value: string) => {
    setIsAutomated(value === "automated");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button className="h-8 px-2 lg:px-3 ml-2">Create quick test</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Test</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new test
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {" "}
          <div className="space-y-2">
            <Label htmlFor="scenario">Scenario</Label>
            <Input
              id="scenario"
              placeholder="Describe the scenario"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue="pending" onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="pass">Pass</SelectItem>
                <SelectItem value="fail">Fail</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <fieldset className="flex-1 space-y-2">
              <legend className="font-medium">Type</legend>
              <div className="flex items-center gap-4">
                <RadioGroup
                  defaultValue="manual"
                  onValueChange={handleTypeChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manual" id="r1" />
                    <Label htmlFor="r1">Manual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="automated" id="r2" />
                    <Label htmlFor="r2">Automated</Label>
                  </div>
                </RadioGroup>
              </div>
            </fieldset>
            <div className="flex-1 space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                defaultValue="medium"
                onValueChange={handlePriorityChange} // Update state on change
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              className="min-h-[100px]"
              id="notes"
              placeholder="Any additional notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
            <div>
              <Button
                variant="outline"
                type="button"
                onClick={(event) => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
