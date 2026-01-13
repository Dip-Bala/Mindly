"use client";

import LogoutButton from "@/app/(dashboard)/components/LogoutButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { CircleUserRound, PanelLeft, User, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from 'next/image'
import { useState } from "react";
import AddContentModal from "./AddContentModal";

type Category = {
  _id: string;
  name: string;
  color: string;
};

type HeaderProps = {
  activeCategory: Category | null,
  sidebarOpen: boolean;
  onMenuClick: () => void;
};

export default function Header({ activeCategory, sidebarOpen, onMenuClick }: HeaderProps) {
  const session = useSession();
  const [openSettings, setOpenSettings] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // console.log("activeCategory", activeCategory);
  // console.log(session)
  return (
    <header className="flex items-center justify-between gap-2 p-3 border-b border-border">
      <div className="flex gap-2 items-center">
      {!sidebarOpen && (
        <button
          onClick={onMenuClick}
          className="text-text-secondaryfont-light cursor-pointer hover:bg-surface-elevated p-1 rounded-lg"
        >
          <PanelLeft size={24} strokeWidth={1.25} />
        </button>
      )}

      <h1 className="font-medium">{activeCategory?.name}</h1>
       <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded bg-primary text-black cursor-pointer"
            >
              Add Content
            </button>
      
            {showModal && (
              <AddContentModal
                activeCategoryId={activeCategory?._id!}
                onClose={() => setShowModal(false)}
              />
            )}
      </div>

      <div className="flex gap-2">
        <ThemeToggle/>
        <button 
        onClick={() => setOpenSettings(true)}
        className="cursor-pointer hover:bg-surface-elevated rounded-full"
        >
          {
            session.data?.user.image? <Image
            src={session.data?.user.image || "/default-avatar.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full border"
          /> :<CircleUserRound size={32} strokeWidth={1} className="text-text-muted" />
          }
        </button>
      </div>

      {openSettings && 
      <div className="bg-surface shadow-sm absolute top-18 right-2 rounded-lg">
        <div className="p-4 flex flex-col text-text-secondary">
        <div className="cursor-pointer flex justify-end">
          <X size={24} strokeWidth={1.5} 
          onClick={() => setOpenSettings(false)}/>
        </div>
        <div className="flex flex-col gap-2">
        <p>Hi <span className="text-primary italic">{session.data?.user.name}</span></p>
        <p>Your email <span className="text-primary underline">{session.data?.user.email}</span></p>
        <LogoutButton />
        </div>
        </div>

      </div>}
    </header>
  );
}
