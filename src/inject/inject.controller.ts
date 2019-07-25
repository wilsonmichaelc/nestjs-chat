import { Controller, Get } from '@nestjs/common';
import { InjectService } from './inject.service';

@Controller('inject')
export class InjectController {

    constructor(private injectService: InjectService) {}

    @Get()
    test(): Promise<any> {
        return this.injectService.test();
    }
}
