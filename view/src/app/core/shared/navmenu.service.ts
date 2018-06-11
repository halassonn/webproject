import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavMenuServices {

    public navItems: any;
    backendpoint = '/administrator/index/';
    constructor(private router: Router) {
        this.navItems = this.getNav();
    }


    getNav(): any {
        const nav = [
            {
                name: 'Dashboard',
                url: this.backendpoint + 'dashboard',
                icon: 'dashboard',
                badge: {
                    variant: 'info',
                    text: 'NEW'
                }
            },
            {
                name: 'Page',
                url: this.backendpoint + 'page',
                icon: 'file',
            },
            {
                name: 'Kategori',
                url: this.backendpoint + 'kategori',
                icon: 'plus'
            },
            {
                name: 'Post',
                url: this.backendpoint + 'postingan',
                icon: 'list'
            },
            {
                name: 'Setting',
                url: this.backendpoint + 'setting',
                icon: 'gear'
            }

        ];

        return nav;
    }
    goPage(page, arg) {
        this.router.navigate([page], { queryParams: { order: arg } });
    }


}
