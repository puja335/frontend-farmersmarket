import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import React from "react"

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: {
    linkedin?: string,
    twitter?: string,
    github?: string,
  };
}

interface TeamModalProps {
  member: TeamMember;
}

export function TeamModal({ member }: TeamModalProps) {
  if (!member) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='cursor-pointer group'>
          <div className='relative overflow-hidden rounded-lg aspect-square mb-4'>
            <img
              src={member.image || "/placeholder.svg"}
              alt={member.name || "Team member"}
              className='object-cover transition-transform group-hover:scale-105 w-full h-full'
            />
          </div>
          <h3 className='text-xl font-semibold text-green-50'>{member.name}</h3>
          <p className='text-green-300'>{member.role}</p>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-green-900 text-green-50'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold flex items-center justify-between'>
            {member.name}
            <DialogClose asChild>
              <Button
                variant='ghost'
                size='icon'
                className='text-green-50 hover:text-green-300'
              >
                <X className='h-4 w-4' />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        {/* Add additional content here if needed */}
      </DialogContent>
    </Dialog>
  )
}
