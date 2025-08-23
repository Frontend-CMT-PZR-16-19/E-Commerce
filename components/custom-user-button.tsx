"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { User } from "@heroui/user";
import { Badge } from "@heroui/badge";
import { Chip } from "@heroui/chip";
import { Card, CardBody } from "@heroui/card";
import { useRouter } from "next/navigation";

// Simple icon components as replacements
const UserIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CogIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);

const ArrowRightOnRectangleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

export const CustomUserButton = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!isLoaded || !user) {
    return null;
  }

  const handleAction = (key: React.Key) => {
    const keyStr = key.toString();
    switch (keyStr) {
      case "profile":
        router.push("/profile");
        break;
      case "orders":
        router.push("/orders");
        break;
      case "settings":
        router.push("/settings");
        break;
      case "logout":
        signOut(() => router.push("/"));
        break;
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* User Status Chip */}
      <Chip color="success" variant="dot" className="hidden sm:flex">
        Online
      </Chip>

      {/* User Name Display */}
      <div className="hidden md:block text-right">
        <p className="text-sm font-medium text-foreground">
          {user.fullName || "User"}
        </p>
        <p className="text-xs text-foreground-500">
          {user.primaryEmailAddress?.emailAddress}
        </p>
      </div>

      {/* Dropdown Menu */}
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button variant="light" className="p-0 min-w-0 h-auto" radius="full">
            <Badge
              content=""
              color="success"
              shape="circle"
              placement="bottom-right"
              showOutline={false}
              size="sm"
            >
              <Avatar
                size="md"
                src={user.imageUrl}
                name={user.fullName || user.primaryEmailAddress?.emailAddress}
                className="border-2 border-primary-200 hover:border-primary-400 transition-all duration-200 hover:scale-105"
                isBordered
                color="primary"
              />
            </Badge>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User menu actions"
          onAction={handleAction}
          className="w-80"
          variant="faded"
        >
          <DropdownSection showDivider>
            <DropdownItem
              key="user-info"
              className="h-16 gap-3"
              textValue="User info"
              isReadOnly
            >
              <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-0">
                <CardBody className="p-3">
                  <User
                    name={user.fullName || "User"}
                    description={user.primaryEmailAddress?.emailAddress}
                    avatarProps={{
                      src: user.imageUrl,
                      size: "sm",
                      isBordered: true,
                      color: "primary",
                    }}
                    classNames={{
                      name: "text-sm font-semibold",
                      description: "text-xs text-foreground-600",
                    }}
                  />
                </CardBody>
              </Card>
            </DropdownItem>
          </DropdownSection>

          <DropdownSection showDivider title="Account">
            <DropdownItem
              key="profile"
              startContent={<UserIcon className="w-4 h-4" />}
              className="text-foreground hover:bg-primary-50"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">Profile</span>
                <span className="text-xs text-foreground-500">
                  View and edit profile
                </span>
              </div>
            </DropdownItem>
            <DropdownItem
              key="orders"
              startContent={<ShoppingBagIcon className="w-4 h-4" />}
              className="text-foreground hover:bg-primary-50"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">My Orders</span>
                <span className="text-xs text-foreground-500">
                  Track your orders
                </span>
              </div>
            </DropdownItem>
            <DropdownItem
              key="settings"
              startContent={<CogIcon className="w-4 h-4" />}
              className="text-foreground hover:bg-primary-50"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">Settings</span>
                <span className="text-xs text-foreground-500">
                  Manage preferences
                </span>
              </div>
            </DropdownItem>
          </DropdownSection>

          <DropdownSection>
            <DropdownItem
              key="logout"
              className="text-danger hover:bg-danger-50"
              color="danger"
              startContent={<ArrowRightOnRectangleIcon className="w-4 h-4" />}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">Sign Out</span>
                <span className="text-xs text-danger-400">
                  Log out of your account
                </span>
              </div>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
