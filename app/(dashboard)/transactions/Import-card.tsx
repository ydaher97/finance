import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dateFormat = "yyyy-mm-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd"

const requiredOptions = [
  "amount",
  "date",
  "payee"
]

interface SelcetedColumnsState   {
  [key: string]: string | null;
}

type Props = {
    data: string[][];
    onSubmit: (data:any) => void;
    onCancle: () => void
}
export const ImportCard = ({data, onCancle,onSubmit}:Props) => {

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import transactions
          </CardTitle>
          <div className="flex items-center gap-x-2">
          <Button size="sm" onClick={() => {}}>
            add new
          </Button>
          </div>
         
        </CardHeader>
        <CardContent>
          hello
        </CardContent>
      </Card>
    </div>
  )
}

