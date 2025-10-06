"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useCreateNewChat } from "@/hooks/useCreateNewChat";
import { useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import UserSearch from "./UserSearch";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function NewChatDialog({
	children,
}: {
	children: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const [selectedUsers, setSelectedUsers] = useState<Doc<"users">[]>([]);
	const [groupName, setGroupName] = useState("");
	const createNewChat = useCreateNewChat();
	const { user } = useUser();
	const { setActiveChannel } = useChatContext();

	const handleSelectUser = (user: Doc<"users">) => {
		//Avoid adding the same user twice
		if (!selectedUsers.find((u) => u._id === user._id)) {
			setSelectedUsers((prev) => [...prev, user]);
		}
	};

	const removeUser = (userId: string) => {
		setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
	};

	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen);
		if (!newOpen) {
			//Reset form when dialog closes
			setSelectedUsers([]);
			setGroupName("");
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Start a New Chat</DialogTitle>
					<DialogDescription>
						Search for users to start a conversation with
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{/* Search component */}
					<UserSearch
						onSelectUser={handleSelectUser}
						className="w-full"
					/>
					{/* Selected users */}
					{selectedUsers.length > 0 && (
						<div className="space-y-3">
							<h4 className="text-sm font-medium text-foreground">
								Selected Users ({selectedUsers.length})
							</h4>
							<div className="space-y-2 max-h-[200px] overflow-y-auto">
								{selectedUsers.map((user) => (
									<div
										key={user._id}
										className="flex items-center justify-between p-2 bg-muted/5- border border-border rounded-lg"
									>
										<div className="flex items-center space-x-2">
											<Image
												src={user.imageUrl}
												alt={user.name}
												width={24}
												height={24}
												className="h-6 w-6 rounded-full object-cover"
											/>
											<div className="min-w-0 flex-1">
												<p className="text-sm font-medium text-foreground truncate">
													{user.name}
												</p>
												<p className="text-xs text-muted-foreground truncate">
													{user.email}
												</p>
											</div>
										</div>
										<button
											onClick={() => removeUser(user._id)}
											className="text-red-500 hover:text-red-700 text-sm font-medium"
										>
											<XIcon className="h-4 w-4" />
										</button>
									</div>
								))}
							</div>
                {/* Group Name Input for Group Chats */}
                {selectedUsers.length > 1 && (
                  <div className="space-y-2">
                    <label htmlFor="groupName" className="text-sm font-medium text-foreground">
                      Group Name (Optional)
                    </label>
                    <Input id="groupName" type="text" placeholder="Enter a name for group chat..." value={groupName} onChange={(e) => setGroupName(e.target.value)}  className="w-full"/>
                    <p className="text-xs text-muted-foreground">
                      Leave empty to use default name: &quot;Group chat ({selectedUsers.length +1} members)&quot;
                    </p>
                  </div>
                )}
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
