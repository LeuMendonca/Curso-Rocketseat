import { Button } from '@/components/ui/button'
import { Helmet } from 'react-helmet-async'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

const signUpSchema = z.object({
    restaurantName: z.string(),
    menagerName: z.string(),
    phone: z.string(),
    email: z.string().email()
})

type signUpForm = z.infer<typeof signUpSchema>



export function SignUp(){

    const navigate = useNavigate()

    const { register , handleSubmit , formState: { isSubmitting } } = useForm<signUpForm>({
        
    })

    async function handleSignUp( data: signUpForm ){
        try{
            await new Promise( resolve => setTimeout( resolve , 2000 ))
            toast.success('Restaurante cadastrado com sucesso.',{
                action: {
                    label: 'Login',
                    onClick: () => navigate('/sign-in')
                }
            })
            console.log(data)
        }catch{
            toast.error('Erro ao cadastrar restaurante.')
        }
        
    }

    return (
        <>
            <Helmet title='Cadastro'/>
            <div className='p-8'>

                <Button asChild variant={'ghost'} className='absolute right-8 top-8'>
                    <Link to='/sign-in'>
                        Fazer login
                    </Link>
                </Button>

                <div className='w-[350px] flex flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Criar conta grátis
                        </h1>

                        <p className='text-sm text-muted-foreground'>
                            Seja um parceiro e comece suas vendas!
                        </p>
                    </div>

                    <form className='space-y-4' onSubmit={handleSubmit(handleSignUp)}>
                        <div className='space-y-2'>
                            <Label htmlFor='restaurantName'>Nome do estabelecimento</Label>
                            <Input id='restaurantName' type='text' {...register('restaurantName')}/>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='menagerName'>Seu nome</Label>
                            <Input id='menagerName' type='text' {...register('menagerName')}/>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='email'>Seu e-mail</Label>
                            <Input id='email' type='email' {...register('email')}/>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='phone'>Seu celular</Label>
                            <Input id='phone' type='text' {...register('phone')}/>
                        </div>

                        <Button className="w-full" type='submit' disabled={ isSubmitting }>Finalizar cadastro</Button>

                        <p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
                            Ao continuar, você concorda com os nossos <a className='underline'>Termos de serviço</a> e{' '} <a className='underline'>políticas de privacidade</a>.
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}