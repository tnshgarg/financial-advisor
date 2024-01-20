"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { generateRandomId } from "@/lib/utils";
import axios from "axios";
import { Download, FolderIcon, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function FolderContent() {
  const folderId = usePathname().split("/").pop();
  const router = useRouter();
  const [documents, setDocuments] = useState<any[] | undefined>();
  const [documentTitle, setDocumentTitle] = useState<string>("");

  const getFolderContent = async () => {
    const response = await axios.post("/api/folder/get-content", {
      folderId: folderId,
    });
    console.log("GET API Response: ", response.data);
    setDocuments(response.data);
  };

  useEffect(() => {
    getFolderContent();
  }, []);

  const createDocument = async () => {
    try {
      const response = await axios.post("/api/folder", {
        documentTitle: documentTitle,
        documentId: generateRandomId(10),
        folderId: folderId,
      });

      console.log("Document Creation Data: ", response.data);
      if (documents)
        setDocuments((prevDocuments) => [response.data, ...documents]);
      setDocumentTitle("");
    } catch (error) {
      console.log("Document Creation Error: ", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="px-10 md:px-20 lg:px-12">
      <Popover>
        <PopoverTrigger className=" border-black shadow-md border-4 font-bold bg-white px-4 py-2 rounded-3xl text-lg text-black flex flex-row w-full align-middle items-center justify-center">
          <Plus className="mr-2" /> New Document
        </PopoverTrigger>
        <PopoverContent className="w-[400px]">
          <div className="flex flex-row align-middle items-center">
            <Label className="font-semibold text-lg w-full">
              Document Title
            </Label>
            <Input
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              placeholder="Enter Document Title"
            />
          </div>
          <Button className="h-8 bg-black w-full mt-4" onClick={createDocument}>
            Create Document
          </Button>
        </PopoverContent>
      </Popover>
      <div className="w-full pt-10">
        {documents?.map((value, index) => (
          <Card
            onClick={() => {
              router.push(`/documents/${value.folderId}/${value.documentId}`);
            }}
            key={value.documentId} // Ensure each element has a unique key
            className="shadow-sm rounded-xl p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/6 mb-4 sm:mb-8 mr-7 cursor-pointer hover:shadow-lg flex flex-row items-center"
          >
            <div className="w-[70%] items-center justify-center">
              <FolderIcon className="ml-auto mr-auto" width={60} height={60} />
              <p className="text-center">{value?.documentTitle}</p>
            </div>
            <div className="w-[30%]">
              <Download className="ml-auto mr-auto" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FolderContent;
