import { Intern } from 'src/app/core/models/intern';
import { InitialPipe } from './initial.pipe';

describe('BidonDirective', () => {
  it('should create an instance', () => {
    const pipe = new InitialPipe();
    expect(pipe).toBeTruthy();
  });

  it(`Should transform Intern named Jean-Luc Aubert to JLA`, () => {
    const intern: Intern = new Intern();
    intern.name = 'Aubert';
    intern.firstname = 'Jean-Luc';

    const pipe = new InitialPipe();
    const transformed: string = pipe.transform(intern);

    expect(transformed).toBe('JLA');
  });


});
