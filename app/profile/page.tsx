"use client";

import React, { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Tabs, Tab } from "@heroui/tabs";
import { Progress } from "@heroui/progress";
import { Divider } from "@heroui/divider";
import { Spacer } from "@heroui/spacer";
import { Chip } from "@heroui/chip";
import { Badge } from "@heroui/badge";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Skeleton } from "@heroui/skeleton";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation";

// Icons
const EditIcon = ({ className }: { className?: string }) => (
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
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
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
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
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
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
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
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const CreditCardIcon = ({ className }: { className?: string }) => (
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
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  if (!isLoaded) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardBody className="p-6 space-y-4">
              <div className="flex flex-col items-center">
                <Skeleton className="rounded-full">
                  <div className="w-32 h-32 rounded-full"></div>
                </Skeleton>
                <Spacer y={4} />
                <Skeleton className="rounded-lg">
                  <div className="h-6 w-32"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="h-4 w-24"></div>
                </Skeleton>
              </div>
            </CardBody>
          </Card>
          <Card className="md:col-span-2">
            <CardBody className="p-6 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="rounded-lg">
                  <div className="h-12 w-full"></div>
                </Skeleton>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/");
    return null;
  }

  const profileCompletionPercentage = () => {
    let completion = 0;
    if (user.firstName) completion += 20;
    if (user.lastName) completion += 20;
    if (user.primaryEmailAddress) completion += 20;
    if (user.imageUrl) completion += 20;
    if (user.primaryPhoneNumber) completion += 20;
    return completion;
  };

  const handleSave = () => {
    // Here you would update the user's information via Clerk
    user.update({
      firstName,
      lastName,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1 shadow-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg">
            <CardHeader className="pb-0">
              <div className="w-full text-center">
                <Badge
                  content=""
                  color="success"
                  shape="circle"
                  placement="bottom-right"
                  showOutline={false}
                  size="lg"
                >
                  <Avatar
                    src={user.imageUrl}
                    className="w-32 h-32 border-4 border-white dark:border-gray-700 shadow-xl"
                    name={user.fullName || "User"}
                  />
                </Badge>
              </div>
            </CardHeader>
            <CardBody className="text-center pt-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                {user.fullName || "Welcome User"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {user.primaryEmailAddress?.emailAddress}
              </p>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Profile Completion
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {profileCompletionPercentage()}%
                  </span>
                </div>
                <Progress
                  value={profileCompletionPercentage()}
                  className="max-w-md"
                  color="primary"
                  size="sm"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <Chip color="success" variant="flat" size="sm">
                  <ShieldCheckIcon className="w-3 h-3 mr-1" />
                  Verified
                </Chip>
                <Chip color="primary" variant="flat" size="sm">
                  Member since{" "}
                  {new Date(user.createdAt || Date.now()).getFullYear()}
                </Chip>
              </div>

              <Button
                color="primary"
                variant="shadow"
                className="w-full mb-2"
                startContent={<EditIcon className="w-4 h-4" />}
                onPress={onOpen}
              >
                Edit Profile
              </Button>

              <Button
                color="danger"
                variant="light"
                className="w-full"
                onPress={() => signOut(() => router.push("/"))}
              >
                Sign Out
              </Button>
            </CardBody>
          </Card>

          {/* Main Content */}
          <Card className="md:col-span-2 shadow-xl border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg">
            <CardBody className="p-0">
              <Tabs
                aria-label="Profile sections"
                classNames={{
                  tabList:
                    "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                  cursor: "w-full bg-primary",
                  tab: "max-w-fit px-6 py-4 h-12",
                  tabContent:
                    "group-data-[selected=true]:text-primary font-semibold",
                }}
                variant="underlined"
              >
                <Tab
                  key="personal"
                  title={
                    <div className="flex items-center space-x-2">
                      <EditIcon className="w-4 h-4" />
                      <span>Personal Information</span>
                    </div>
                  }
                >
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                            <EditIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              First Name
                            </p>
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {user.firstName || "Not provided"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="p-2 bg-secondary-100 dark:bg-secondary-900 rounded-lg">
                            <EditIcon className="w-5 h-5 text-secondary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Last Name
                            </p>
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {user.lastName || "Not provided"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="p-2 bg-success-100 dark:bg-success-900 rounded-lg">
                            <EmailIcon className="w-5 h-5 text-success" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Email Address
                            </p>
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {user.primaryEmailAddress?.emailAddress}
                            </p>
                            {user.primaryEmailAddress?.verification?.status ===
                              "verified" && (
                              <Chip
                                color="success"
                                size="sm"
                                variant="flat"
                                className="mt-1"
                              >
                                Verified
                              </Chip>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="p-2 bg-warning-100 dark:bg-warning-900 rounded-lg">
                            <PhoneIcon className="w-5 h-5 text-warning" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Phone Number
                            </p>
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {user.primaryPhoneNumber?.phoneNumber ||
                                "Not provided"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="p-2 bg-danger-100 dark:bg-danger-900 rounded-lg">
                            <CalendarIcon className="w-5 h-5 text-danger" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Member Since
                            </p>
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {new Date(
                                user.createdAt || Date.now()
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                            <ShieldCheckIcon className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Last Updated
                            </p>
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {new Date(
                                user.updatedAt || Date.now()
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>

                <Tab
                  key="security"
                  title={
                    <div className="flex items-center space-x-2">
                      <ShieldCheckIcon className="w-4 h-4" />
                      <span>Security</span>
                    </div>
                  }
                >
                  <div className="p-6 space-y-6">
                    <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0">
                      <CardBody className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-success-100 dark:bg-success-900 rounded-full">
                            <ShieldCheckIcon className="w-6 h-6 text-success" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                              Account Security
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              Your account is secured with modern authentication
                              methods.
                            </p>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  Two-factor authentication
                                </span>
                                <Chip color="success" size="sm" variant="flat">
                                  Enabled
                                </Chip>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  Email verification
                                </span>
                                <Chip color="success" size="sm" variant="flat">
                                  Verified
                                </Chip>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  Password strength
                                </span>
                                <Chip color="success" size="sm" variant="flat">
                                  Strong
                                </Chip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        color="primary"
                        variant="flat"
                        className="h-12"
                        startContent={<EditIcon className="w-4 h-4" />}
                      >
                        Change Password
                      </Button>
                      <Button
                        color="secondary"
                        variant="flat"
                        className="h-12"
                        startContent={<ShieldCheckIcon className="w-4 h-4" />}
                      >
                        Manage 2FA
                      </Button>
                    </div>
                  </div>
                </Tab>

                <Tab
                  key="preferences"
                  title={
                    <div className="flex items-center space-x-2">
                      <CreditCardIcon className="w-4 h-4" />
                      <span>Preferences</span>
                    </div>
                  }
                >
                  <div className="p-6 space-y-6">
                    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0">
                      <CardBody className="p-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                          Account Preferences
                        </h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-800 dark:text-white">
                                Email Notifications
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Receive emails about your account activity
                              </p>
                            </div>
                            <Button color="primary" size="sm" variant="flat">
                              Configure
                            </Button>
                          </div>

                          <Divider />

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-800 dark:text-white">
                                Marketing Communications
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Receive promotional emails and updates
                              </p>
                            </div>
                            <Button color="secondary" size="sm" variant="flat">
                              Manage
                            </Button>
                          </div>

                          <Divider />

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-800 dark:text-white">
                                Privacy Settings
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Control your privacy and data usage
                              </p>
                            </div>
                            <Button color="warning" size="sm" variant="flat">
                              Settings
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>

        {/* Edit Profile Modal */}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="2xl"
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold">Edit Profile</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Update your personal information
                  </p>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col items-center mb-6">
                    <Avatar
                      src={user.imageUrl}
                      className="w-24 h-24 border-4 border-gray-200 dark:border-gray-700"
                      name={user.fullName || "User"}
                    />
                    <Button
                      color="primary"
                      variant="light"
                      size="sm"
                      className="mt-2"
                      startContent={<EditIcon className="w-3 h-3" />}
                    >
                      Change Photo
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      placeholder="Enter your first name"
                      value={firstName}
                      onValueChange={setFirstName}
                      startContent={
                        <EditIcon className="w-4 h-4 text-gray-400" />
                      }
                    />
                    <Input
                      label="Last Name"
                      placeholder="Enter your last name"
                      value={lastName}
                      onValueChange={setLastName}
                      startContent={
                        <EditIcon className="w-4 h-4 text-gray-400" />
                      }
                    />
                  </div>

                  <Input
                    label="Email Address"
                    placeholder="Enter your email"
                    value={user.primaryEmailAddress?.emailAddress || ""}
                    isDisabled
                    startContent={
                      <EmailIcon className="w-4 h-4 text-gray-400" />
                    }
                    description="Email cannot be changed from this interface"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleSave();
                      onClose();
                    }}
                    startContent={<EditIcon className="w-4 h-4" />}
                  >
                    Save Changes
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
