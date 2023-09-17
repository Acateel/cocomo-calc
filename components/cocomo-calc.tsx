'use client'

import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select'
import { SelectValue } from '@radix-ui/react-select'

const cof = {
  Organic: { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
  Halfsplit: { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
  Builtin: { a: 3.6, b: 1.2, c: 2.5, d: 0.32 },
}

type CofKey = keyof typeof cof

const formSchema = z.object({
  size: z.number().min(0),
  type: z.string(),
})

const CocomoCalc = ({}) => {
  const [PM, setPM] = useState(0)
  const [TM, setTM] = useState(0)
  const [SS, setSS] = useState(0)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: 0,
      type: 'Organic',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { size, type } = values
    const { a, b, c, d } = cof[type as CofKey]

    const tempPM = a * Math.pow(size, b)
    const tempTM = c * Math.pow(tempPM, d)
    const tempSS = tempPM / tempTM

    setPM(Math.round(tempPM * 100.0) / 100.0)
    setTM(Math.round(tempTM * 100.0) / 100.0)
    setSS(Math.round(tempSS * 100.0) / 100.0)
  }

  return (
    <div className="flex md:flex-row flex-col items-center justify-around">
      <div className="w-[170px] m-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип проекта:</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Виберіть тип" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Organic">Органічний</SelectItem>
                      <SelectItem value="Halfsplit">Напіврозділений</SelectItem>
                      <SelectItem value="Builtin">Вбудований</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Кількість рядків коду (тисяч)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0"
                      type="number"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Розрахувати!</Button>
          </form>
        </Form>
      </div>
      <div className="w-[170px] h-[150px] m-4 flex flex-col justify-around">
        <div>
          Трудоємність: <span className="text-indigo-500">{PM}</span>
        </div>
        <div>
          Тривалість: <span className="text-indigo-500">{TM}</span>
        </div>
        <div>
          Рорзробників: <span className="text-indigo-500">{SS}</span>
        </div>
      </div>
    </div>
  )
}

export default CocomoCalc
