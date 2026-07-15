import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ContactService } from "./contact.service";
import { ContactDto } from "./contact.dto";

@ApiTags("Contact")
@Controller("contact")
export class ContactController {
    constructor(private readonly service: ContactService) {}

    @Post()
    @ApiOperation({ summary: "Send a contact message" })
    @ApiResponse({ status: 201, description: "Message sent successfully" })
    @ApiResponse({ status: 400, description: "Validation error" })
    async send(@Body() dto: ContactDto) {
        await this.service.send(dto);
        return { success: true };
    }
}
