"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => toast.success("Background job started"),
    })
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mb-4"
      />
      <Button
        className="cursor-pointer"
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ value })}
      >
        Invoke Background Job
      </Button>
    </div>
  );
};

export default Home;
