import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { request } from 'http';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Public()
    @Post("/login")
    async login(@Body() loginDto: LoginDto){
        // console.log("login dto : "+loginDto);
        const access_token = await this.authService.login(loginDto.email, loginDto.password);
        return access_token;
    }

    @UseGuards(AuthGuard)
    @Get("/me")
    async getMe(@Request() request){
        console.log(request.user.sub);
        return await this.authService.getMe(request.user.sub);
    }
}
