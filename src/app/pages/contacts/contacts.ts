import { Component } from '@angular/core';
import { Card } from "../../components/card/card";
import { Button } from "../../components/button/button";

@Component({
  selector: 'app-contacts',
  imports: [Card, Button],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class Contacts {

}
